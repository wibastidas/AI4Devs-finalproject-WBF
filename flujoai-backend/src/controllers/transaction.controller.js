const { Transaction, AccountBalance, Account, Category } = require('../models/associations');
const { Op } = require('sequelize');
const sequelize = require('../config/database');
const moment = require('moment');

exports.createTransaction = async (req, res) => {
  const t = await sequelize.transaction();
  
  try {
    const { amount, date, type, account_id, category_id, description } = req.body;
    const user = req.user;

    console.log('📝 Creando transacción:', {
      amount,
      date,
      type,
      account_id,
      category_id,
      description,
      business_id: user.business_id
    });

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

    console.log('✅ Transacción creada:', transaction.toJSON());

    await t.commit();
    res.status(201).json(transaction);

  } catch (error) {
    await t.rollback();
    console.error('❌ Error al crear transacción:', error);
    res.status(500).json({ error: 'Error al crear la transacción' });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const user = req.user;
    
    // Ajustar las fechas considerando la zona horaria
    const start = startDate 
      ? moment(startDate).startOf('day').toDate()
      : moment().subtract(30, 'days').startOf('day').toDate();
    
    const end = endDate 
      ? moment(endDate).endOf('day').toDate()
      : moment().endOf('day').toDate();
    
    console.log('🔍 Fechas originales:', {
      startDate,
      endDate
    });

    console.log('🔍 Fechas procesadas:', {
      start,
      end
    });

    const transactions = await Transaction.findAll({
      where: {
        business_id: user.business_id,
        date: {
          [Op.gte]: start,
          [Op.lte]: end
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

    // Log para depuración
    console.log('📊 Query SQL:', transactions.length);

    res.status(200).json({
      ok: true,
      transactions,
      metadata: {
        startDate: start,
        endDate: end,
        total: transactions.length,
        query: {
          business_id: user.business_id,
          dateRange: [start, end]
        }
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
