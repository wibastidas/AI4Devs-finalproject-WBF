const { Business } = require('../models/associations');

exports.createBusiness = async (req, res) => {
  try {
    const { name, description } = req.body;

    // Validación básica
    if (!name) {
      return res.status(400).json({ error: 'Invalid data' });
    }

    const business = await Business.create({ name, description });
    res.status(201).json(business);
  } catch (error) {
    console.error(error); 
    res.status(400).json({ error: error.message });
  }
};

