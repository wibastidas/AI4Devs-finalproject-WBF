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

exports.getAllAccounts = async (req, res) => {
  try {
    const accounts = await Account.findAll();
    res.status(200).json(accounts);
  } catch (error) {
    console.error(error); 
    res.status(500).json({ error: error.message });
  }
};

exports.getAccountById = async (req, res) => {
  try {
    const account = await Account.findByPk(req.params.id);
    if (account) {
      res.status(200).json(account);
    } else {
      res.status(404).json({ error: 'Account not found' });
    }
  } catch (error) {
    console.error(error); 
    res.status(500).json({ error: error.message });
  }
};

exports.updateAccount = async (req, res) => {
  try {
    const [updated] = await Account.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedAccount = await Account.findByPk(req.params.id);
      res.status(200).json(updatedAccount);
    } else {
      res.status(404).json({ error: 'Account not found' });
    }
  } catch (error) {
    console.error(error); 
    res.status(400).json({ error: error.message });
  }
};

exports.deleteAccount = async (req, res) => {
  try {
    const deleted = await Account.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Account not found' });
    }
  } catch (error) {
    console.error(error); 
    res.status(500).json({ error: error.message });
  }
};
