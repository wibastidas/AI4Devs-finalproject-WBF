const { User } = require('../models/associations');

exports.createUser = async (req, res) => {
  try {
    const { username, email, password, business_id } = req.body;

    // Validación básica
    if (!username || !email || !password || !business_id) {
      return res.status(400).json({ error: 'Invalid data' });
    }

    const user = await User.create({ username, email, password, business_id });
    res.status(201).json(user);
  } catch (error) {
    console.error(error); 
    res.status(400).json({ error: error.message });
  }
};

