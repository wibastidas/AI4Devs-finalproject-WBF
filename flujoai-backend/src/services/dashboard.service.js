const { Transaction, Account, Category, AccountBalance } = require('../models/associations');
const { Op } = require('sequelize');
const sequelize = require('sequelize');

const getIncomeExpensesByDate = async ({ startDate, endDate }) => {
  try {
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

    return {
      ok: true,
      summary: {
        monthlyIncome: Number(transactions[0].totalIncome) || 0,
        monthlyExpenses: Number(transactions[0].totalExpenses) || 0
      },
      period: {
        startDate,
        endDate
      }
    };
  } catch (error) {
    console.error('Error en getIncomeExpensesByDate:', error);
    throw error;
  }
};

const getBalanceDistribution = async () => {
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

  return {
    ok: true,
    totalBalance: balances.reduce((acc, balance) => 
      acc + Number(balance.current_balance), 0),
    distribution
  };
};

const getExpensesByCategory = async ({ startDate, endDate }) => {
  const expenses = await Transaction.findAll({
    where: {
      type: 'expense',
      date: {
        [Op.between]: [startDate, endDate]
      }
    },
    include: [{
      model: Category,
      attributes: ['name']
    }],
    attributes: [
      'category_id',
      'amount'
    ]
  });

  const expensesByCategory = expenses.reduce((acc, transaction) => {
    const categoryName = transaction.Category.name;
    acc[categoryName] = (acc[categoryName] || 0) + Number(transaction.amount);
    return acc;
  }, {});

  return {
    ok: true,
    expensesByCategory
  };
};

const getIncomeByCategory = async ({ startDate, endDate }) => {
  const incomes = await Transaction.findAll({
    where: {
      type: 'income',
      date: {
        [Op.between]: [startDate, endDate]
      }
    },
    include: [{
      model: Category,
      attributes: ['name']
    }],
    attributes: [
      'category_id',
      'amount'
    ]
  });

  const incomesByCategory = incomes.reduce((acc, transaction) => {
    const categoryName = transaction.Category.name;
    acc[categoryName] = (acc[categoryName] || 0) + Number(transaction.amount);
    return acc;
  }, {});

  return {
    ok: true,
    incomesByCategory
  };
};

const getDashboardSummary = async ({ startDate, endDate }) => {
  try {
    // Obtener el balance total actual
    const balances = await AccountBalance.findAll();
    const totalBalance = balances.reduce((acc, balance) => 
      acc + Number(balance.current_balance), 0);

    // Obtener ingresos y gastos del período
    const transactions = await Transaction.findAll({
      where: {
        date: {
          [Op.between]: [startDate, endDate]
        }
      },
      attributes: [
        [sequelize.fn('SUM', sequelize.literal("CASE WHEN type = 'income' THEN amount ELSE 0 END")), 'monthlyIncome'],
        [sequelize.fn('SUM', sequelize.literal("CASE WHEN type = 'expense' THEN amount ELSE 0 END")), 'monthlyExpenses']
      ],
      raw: true
    });

    return {
      ok: true,
      summary: {
        totalBalance,
        monthlyIncome: Number(transactions[0].monthlyIncome) || 0,
        monthlyExpenses: Number(transactions[0].monthlyExpenses) || 0
      },
      period: {
        startDate,
        endDate
      }
    };
  } catch (error) {
    console.error('Error en getDashboardSummary:', error);
    throw error;
  }
};

module.exports = {
  getDashboardSummary,
  getIncomeExpensesByDate,
  getBalanceDistribution,
  getExpensesByCategory,
  getIncomeByCategory
}; 