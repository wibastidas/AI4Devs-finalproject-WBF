const { Transaction, AccountBalance } = require('../models/associations');
const { Op } = require('sequelize');
const sequelize = require('../config/database');

exports.createTransaction = async (req, res) => {
  const t = await sequelize.transaction();
  
  try {
    const { amount, date, type, account_id, category_id, description } = req.body;

    // Validar los datos de entrada
    if (amount <= 0) {
      return res.status(400).json({ error: 'El monto debe ser mayor a 0' });
    }

    // Crear la transacción
    const transaction = await Transaction.create({
      amount,
      date,
      type,
      account_id,
      category_id,
      description
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
    let whereClause = {};

    if (startDate && endDate) {
      console.log('Fechas recibidas:', { startDate, endDate });
      
      whereClause.date = {
        [Op.between]: [
          startDate,
          endDate
        ]
      };
    }

    console.log('Where clause:', whereClause);

    const transactions = await Transaction.findAll({
      where: whereClause,
      order: [['date', 'DESC']]
    });

    res.status(200).json({
      ok: true,
      transactions
    });
  } catch (error) {
    console.error('Error al obtener transacciones:', error);
    res.status(500).json({ 
      ok: false, 
      error: 'Error al obtener las transacciones' 
    });
  }
};

exports.getTransactionById = async (req, res) => {
  try {
    const { id } = req.params;
    const transaction = await Transaction.findByPk(id);
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
        
        const transaction = await Transaction.findByPk(id);
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
