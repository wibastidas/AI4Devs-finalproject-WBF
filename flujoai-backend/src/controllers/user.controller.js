const { User, Business } = require('../models/associations');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const sequelize = require('../config/database');

exports.createUser = async (req, res) => {
  const t = await sequelize.transaction();
  
  try {
    const { username, email, password } = req.body;

    // Validación básica
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Invalid data' });
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear business para el usuario sin especificar ID
    const business = await Business.create({
      name: `${username}'s Business`
    }, { 
      transaction: t,
      returning: true
    });

    // Crear usuario
    const user = await User.create({ 
      username, 
      email, 
      password: hashedPassword,
      business_id: business.id
    }, { transaction: t });

    await t.commit();

    // No devolver la contraseña en la respuesta
    const { password: _, ...userWithoutPassword } = user.toJSON();
    res.status(201).json({
      ...userWithoutPassword,
      business: {
        id: business.id,
        name: business.name
      }
    });
  } catch (error) {
    await t.rollback();
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json(users);
  } catch (error) {
    console.error(error); 
    res.status(500).json({ error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error(error); 
    res.status(500).json({ error: error.message });
  }
};

exports.updateUser = async (req, res) => {
  try {
    const [updated] = await User.update(req.body, {
      where: { id: req.params.id }
    });
    if (updated) {
      const updatedUser = await User.findByPk(req.params.id);
      res.status(200).json(updatedUser);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error(error); 
    res.status(400).json({ error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const deleted = await User.destroy({
      where: { id: req.params.id }
    });
    if (deleted) {
      res.status(204).send();
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error(error); 
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    let isValidPassword = false;
    
    // Verificar si la contraseña está hasheada
    if (user.password.startsWith('$2b$') || user.password.startsWith('$2a$')) {
      // Contraseña hasheada
      isValidPassword = await bcrypt.compare(password, user.password);
    } else {
      // Contraseña sin hashear
      isValidPassword = password === user.password;
      
      if (isValidPassword) {
        // Actualizar a contraseña hasheada
        const hashedPassword = await bcrypt.hash(password, 10);
        await User.update(
          { password: hashedPassword },
          { where: { id: user.id } }
        );
      }
    }

    if (!isValidPassword) {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      process.env.JWT_SECRET || 'tu-secreto-jwt',
      { expiresIn: '24h' }
    );

    res.status(200).json({
      token,
      user: {
        id: user.id,
        email: user.email,
        username: user.username
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};
