const { Account } = require('../models/associations');

exports.createAccount = async (req, res) => {
  try {
    const { name, description, business_id } = req.body;

    // Validación básica
    if (!name || !business_id) {
      return res.status(400).json({ error: 'Invalid data' });
    }

    const account = await Account.create({ name, description, business_id });
    res.status(201).json(account);
  } catch (error) {
    console.error(error); 
    res.status(400).json({ error: error.message });
  }
};

