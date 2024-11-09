const { Transaction, Account, Category, AccountBalance } = require('../models/associations');
const { Op } = require('sequelize');
const sequelize = require('sequelize');

exports.getBalanceDistribution = async (req, res) => {
    try {
        const balances = await AccountBalance.findAll({
            include: [{
                model: Account,
                attributes: ['name']
            }],
            attributes: ['account_id', 'current_balance']
        });

        const distribution = balances.map(balance => ({
            account_id: balance.account_id,
            account_name: balance.Account.name,
            balance: balance.current_balance
        }));

        const totalBalance = balances.reduce((acc, balance) => 
            acc + Number(balance.current_balance), 0);

        res.status(200).json({
            ok: true,
            totalBalance,
            distribution
        });
    } catch (error) {
        console.error('Error en getBalanceDistribution:', error);
        res.status(500).json({ 
            ok: false, 
            error: 'Error al obtener la distribución del balance' 
        });
    }
};

exports.getIncomeExpensesByDate = async (req, res) => {
    try {
        const { startDate, endDate } = req.query;
        
        const transactions = await Transaction.findAll({
            where: {
                date: {
                    [Op.between]: [startDate, endDate]
                }
            },
            attributes: [
                [sequelize.fn('SUM', sequelize.literal("CASE WHEN type = 'income' THEN amount ELSE 0 END")), 'totalIncome'],
                [sequelize.fn('SUM', sequelize.literal("CASE WHEN type = 'expense' THEN amount ELSE 0 END")), 'totalExpenses']
            ],
            raw: true
        });

        const summary = {
            totalIncome: Number(transactions[0].totalIncome) || 0,
            totalExpenses: Number(transactions[0].totalExpenses) || 0
        };

        res.status(200).json({
            ok: true,
            summary
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ 
            ok: false, 
            error: 'Error al obtener ingresos y gastos' 
        });
    }
};

exports.getExpensesByCategory = async (req, res) => {
    try {
        const transactions = await Transaction.findAll({
            where: { type: 'expense' },
            include: [{
                model: Category,
                attributes: ['id', 'name']
            }],
            attributes: ['amount', 'category_id']
        });

        const expensesByCategory = transactions.reduce((acc, transaction) => {
            const categoryName = transaction.Category.name;
            acc[categoryName] = (acc[categoryName] || 0) + Number(transaction.amount);
            return acc;
        }, {});

        res.status(200).json({
            ok: true,
            expensesByCategory
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ 
            ok: false, 
            error: 'Error al obtener gastos por categoría' 
        });
    }
};

exports.getIncomesByCategory = async (req, res) => {
    try {
        const transactions = await Transaction.findAll({
            where: { type: 'income' },
            include: [{
                model: Category,
                attributes: ['id', 'name']
            }],
            attributes: ['amount', 'category_id']
        });

        const incomesByCategory = transactions.reduce((acc, transaction) => {
            const categoryName = transaction.Category.name;
            acc[categoryName] = (acc[categoryName] || 0) + Number(transaction.amount);
            return acc;
        }, {});

        res.status(200).json({
            ok: true,
            incomesByCategory
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ 
            ok: false, 
            error: 'Error al obtener ingresos por categoría' 
        });
    }
};

exports.getTransactions = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    
    // Validar el rango de fechas
    const start = new Date(startDate || new Date().setDate(new Date().getDate() - 30));
    const end = new Date(endDate || new Date());
    
    // Validar que el rango no sea mayor a 31 días
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays > 31) {
      return res.status(400).json({ 
        error: 'El rango de fechas no puede ser mayor a 31 días' 
      });
    }

    const transactions = await Transaction.findAll({
      where: {
        date: {
          [Op.between]: [start, end]
        }
      },
      include: [
        {
          model: Account,
          attributes: ['name']
        },
        {
          model: Category,
          attributes: ['name']
        }
      ],
      order: [['date', 'DESC']]
    });

    res.status(200).json({
      ok: true,
      transactions,
      metadata: {
        startDate: start,
        endDate: end,
        total: transactions.length
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las transacciones' });
  }
};

exports.getDashboardSummary = async (req, res) => {
    try {
        // Obtener balance total actual
        const totalBalance = await AccountBalance.sum('current_balance');
        
        // Obtener transacciones del mes actual
        const startOfMonth = new Date();
        startOfMonth.setDate(1);
        startOfMonth.setHours(0, 0, 0, 0);
        
        const currentMonthTransactions = await Transaction.findAll({
            where: {
                date: {
                    [Op.gte]: startOfMonth
                }
            },
            attributes: [
                [sequelize.fn('SUM', sequelize.literal("CASE WHEN type = 'income' THEN amount ELSE 0 END")), 'monthlyIncome'],
                [sequelize.fn('SUM', sequelize.literal("CASE WHEN type = 'expense' THEN amount ELSE 0 END")), 'monthlyExpenses']
            ],
            raw: true
        });

        res.status(200).json({
            ok: true,
            summary: {
                totalBalance,
                monthlyIncome: Number(currentMonthTransactions[0].monthlyIncome) || 0,
                monthlyExpenses: Number(currentMonthTransactions[0].monthlyExpenses) || 0
            }
        });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ 
            ok: false, 
            error: 'Error al obtener el resumen del dashboard' 
        });
    }
};
