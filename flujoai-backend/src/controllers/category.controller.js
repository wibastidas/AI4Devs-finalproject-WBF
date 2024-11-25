const { Category } = require('../models/associations');

exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    const user = req.user;

    if (!name || !description) {
      return res.status(400).json({ error: 'Nombre y descripción son requeridos' });
    }

    const category = await Category.create({ 
      name, 
      description,
      business_id: user.business_id 
    });
    res.status(201).json(category);
  } catch (error) {
    console.error('Error creating category:', error);
    if (error.name === 'SequelizeValidationError') {
      return res.status(400).json({ 
        error: 'Error de validación',
        details: error.errors.map(e => e.message)
      });
    }
    res.status(400).json({ error: error.message });
  }
};

exports.getAllCategories = async (req, res) => {
  try {
    const user = req.user;
    const categories = await Category.findAll({
      where: { business_id: user.business_id }
    });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCategoryById = async (req, res) => {
  try {
    const user = req.user;
    const category = await Category.findOne({
      where: { 
        id: req.params.id,
        business_id: user.business_id 
      }
    });
    if (category) {
      res.status(200).json(category);
    } else {
      res.status(404).json({ error: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const user = req.user;
    const [updated] = await Category.update(req.body, {
      where: { 
        id: req.params.id,
        business_id: user.business_id 
      }
    });
    if (updated) {
      const updatedCategory = await Category.findOne({
        where: { 
          id: req.params.id,
          business_id: user.business_id 
        }
      });
      res.status(200).json(updatedCategory);
    } else {
      res.status(404).json({ error: 'Category not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const user = req.user;
    const deleted = await Category.destroy({
      where: { 
        id: req.params.id,
        business_id: user.business_id 
      }
    });
    if (deleted) {
      res.status(200).json({ message: 'Category deleted successfully' });
    } else {
      res.status(404).json({ error: 'Category not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
