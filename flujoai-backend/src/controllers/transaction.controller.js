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
