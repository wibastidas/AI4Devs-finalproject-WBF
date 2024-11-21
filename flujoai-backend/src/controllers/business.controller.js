const { Business } = require('../models/associations');

exports.createBusiness = async (req, res) => {
  try {
    const { name, description } = req.body;
    const user = req.user;

    if (!name) {
      return res.status(400).json({ error: 'Invalid data' });
    }

    const business = await Business.create({ 
      name, 
      description,
      user_id: user.id 
    });
    res.status(201).json(business);
  } catch (error) {
    console.error(error); 
    res.status(400).json({ error: error.message });
  }
};

exports.getAllBusinesses = async (req, res) => {
  try {
    const user = req.user;
    const businesses = await Business.findAll({
      where: { user_id: user.id }
    });
    res.status(200).json(businesses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getBusinessById = async (req, res) => {
  try {
    const user = req.user;
    const business = await Business.findOne({
      where: { 
        id: req.params.id,
        user_id: user.id
      }
    });
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
    const user = req.user;
    const [updated] = await Business.update(req.body, {
      where: { 
        id: req.params.id,
        user_id: user.id
      }
    });
    if (updated) {
      const updatedBusiness = await Business.findOne({
        where: { 
          id: req.params.id,
          user_id: user.id
        }
      });
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
    const user = req.user;
    const deleted = await Business.destroy({
      where: { 
        id: req.params.id,
        user_id: user.id
      }
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
