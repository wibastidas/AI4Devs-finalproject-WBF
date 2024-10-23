const { Category } = require('../models/associations');

exports.createCategory = async (req, res) => {
  try {
    const { name, description, business_id } = req.body;

    // Validación básica
    if (!name || !business_id) {
      return res.status(400).json({ error: 'Invalid data' });
    }

    const category = await Category.create({ name, description, business_id });
    res.status(201).json(category);
  } catch (error) {
    console.error(error); 
    res.status(400).json({ error: error.message });
  }
};

