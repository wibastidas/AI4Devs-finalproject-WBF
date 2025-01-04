const express = require('express');
const {
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  login
} = require('../controllers/user.controller');

const router = express.Router();

// Ruta para crear un nuevo usuario
router.post('/register', createUser);

// Ruta para obtener todos los usuarios
router.get('/users', getAllUsers);

// Ruta para obtener un usuario por ID la naturaleza
router.get('/user/:id', getUserById);

// Ruta para actualizar un usuario
router.put('/user/:id', updateUser);

// Ruta para eliminar un usuario
router.delete('/user/:id', deleteUser);

// Ruta para login
router.post('/login', login);

module.exports = router;



