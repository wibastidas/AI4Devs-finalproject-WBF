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

exports.getAllBusinesses = async (req, res) => {
  try {
    const businesses = await Business.findAll();
    res.status(200).json(businesses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBusinessById = async (req, res) => {
  try {
    const business = await Business.findByPk(req.params.id);
    if (business) {
      res.status(200).json(business);
    } else {
      res.status(404).json({ error: 'Business not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateBusiness = async (req, res) => {
  try {
    const [updated] = await Business.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedBusiness = await Business.findByPk(req.params.id);
      res.status(200).json(updatedBusiness);
    } else {
      res.status(404).json({ error: 'Business not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteBusiness = async (req, res) => {
  try {
    const deleted = await Business.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'Business not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
