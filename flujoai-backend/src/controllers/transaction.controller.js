const { Transaction, AccountBalance, Account, Category } = require('../models/associations');
const { Op } = require('sequelize');
const sequelize = require('../config/database');

exports.createTransaction = async (req, res) => {
  const t = await sequelize.transaction();
  
  try {
    const { amount, date, type, account_id, category_id, description } = req.body;
    const user = req.user;

    // Validar los datos de entrada
    if (amount <= 0) {
      return res.status(400).json({ error: 'El monto debe ser mayor a 0' });
    }

    // Crear la transacción con business_id
    const transaction = await Transaction.create({
      amount,
      date,
      type,
      account_id,
      category_id,
      description,
      business_id: user.business_id
    }, { transaction: t });

    // Actualizar el balance de la cuenta
    const balanceUpdate = type === 'income' ? amount : -amount;
    
    await AccountBalance.findOrCreate({
      where: { account_id },
      defaults: { current_balance: 0 },
      transaction: t
    });

    await AccountBalance.increment('current_balance', {
      by: balanceUpdate,
      where: { account_id },
      transaction: t
    });

    await t.commit();
    res.status(201).json(transaction);

  } catch (error) {
    await t.rollback();
    console.error(error);
    res.status(500).json({ error: 'Error al crear la transacción' });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const user = req.user;
    
    // Establecer fechas por defecto
    const start = startDate ? new Date(startDate) : new Date(new Date().setDate(new Date().getDate() - 30));
    const end = endDate ? new Date(endDate) : new Date();
    
    console.log('🔍 Consultando transacciones:', {
      business_id: user.business_id,
      startDate: start,
      endDate: end
    });

    const transactions = await Transaction.findAll({
      where: {
        business_id: user.business_id,
        date: {
          [Op.between]: [start, end]
        }
      },
      include: [
        {
          model: Account,
          attributes: ['name'],
          required: false
        },
        {
          model: Category,
          attributes: ['name'],
          required: false
        }
      ],
      order: [['date', 'DESC']]
    });

    console.log(`📊 Encontradas ${transactions.length} transacciones`);

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
    console.error('❌ Error:', error);
    res.status(500).json({ 
      ok: false, 
      error: 'Error al obtener las transacciones',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

exports.getTransactionById = async (req, res) => {
  try {
    const user = req.user;
    const transaction = await Transaction.findOne({
      where: {
        id: req.params.id,
        business_id: user.business_id
      },
      include: [
        {
          model: Account,
          where: { business_id: user.business_id },
          attributes: ['name']
        },
        {
          model: Category,
          where: { business_id: user.business_id },
          attributes: ['name']
        }
      ]
    });
    
    if (!transaction) {
      return res.status(404).json({ error: 'Transacción no encontrada' });
    }
    res.status(200).json(transaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener la transacción' });
  }
};

exports.updateTransaction = async (req, res) => {
    const t = await sequelize.transaction();
    
    try {
        const { id } = req.params;
        const updates = req.body;
        const user = req.user;
        
        const transaction = await Transaction.findOne({
            where: {
                id,
                business_id: user.business_id
            }
        });

        if (!transaction) {
            return res.status(404).json({ error: 'Transacción no encontrada' });
        }

        // Revertir el balance anterior
        const oldImpact = transaction.type === 'income' ? -transaction.amount : transaction.amount;
        await AccountBalance.increment('current_balance', {
            by: oldImpact,
            where: { account_id: transaction.account_id },
            transaction: t
        });

        // Aplicar el nuevo balance
        const newImpact = updates.type === 'income' ? updates.amount : -updates.amount;
        await AccountBalance.increment('current_balance', {
            by: newImpact,
            where: { account_id: updates.account_id || transaction.account_id },
            transaction: t
        });

        // Actualizar la transacción
        await transaction.update(updates, { transaction: t });
        
        await t.commit();
        res.json({ 
            ok: true,
            transaction 
        });
    } catch (error) {
        await t.rollback();
        console.error('Error al actualizar la transacción:', error);
        res.status(500).json({ 
            ok: false,
            error: 'Error al actualizar la transacción' 
        });
    }
};

exports.deleteTransaction = async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findByPk(id);
    if (!transaction) {
      return res.status(404).json({ error: 'Transacción no encontrada' });
    }
    await transaction.destroy();
    res.status(204).send();
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al eliminar la transacción' });
  }
};
