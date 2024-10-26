const { Transaction } = require('../../src/models/associations');

exports.createTransaction = async (req, res) => {
  try {
    const { amount, date, type, account_id, category_id, description } = req.body;

    // Validar los datos de entrada
    if (amount <= 0) {
      return res.status(400).json({ error: 'El monto debe ser mayor a 0' });
    }

    const transaction = await Transaction.create({
      amount,
      date,
      type,
      account_id,
      category_id,
      description,
    });

    res.status(201).json(transaction);
  } catch (error) {
    console.error(error); // Imprime el error en la consola
    res.status(500).json({ error: 'Error al crear la transacción' });
  }
};

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.findAll();
    res.status(200).json(transactions);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener las transacciones' });
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
  try {
    const { id } = req.params;
    const { amount, date, type, account_id, category_id, description } = req.body;
    const transaction = await Transaction.findByPk(id);
    if (!transaction) {
      return res.status(404).json({ error: 'Transacción no encontrada' });
    }
    await transaction.update({ amount, date, type, account_id, category_id, description });
    res.status(200).json(transaction);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al actualizar la transacción' });
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
