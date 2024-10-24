const express = require('express');
const {
  createAccount,
  getAllAccounts,
  getAccountById,
  updateAccount,
  deleteAccount
} = require('../controllers/account.controller');

const router = express.Router();

// Ruta para crear una nueva cuenta
router.post('/account', createAccount);

// Ruta para obtener todas las cuentas
router.get('/accounts', getAllAccounts);

// Ruta para obtener una cuenta por ID
router.get('/account/:id', getAccountById);

// Ruta para actualizar una cuenta
router.put('/account/:id', updateAccount);

// Ruta para eliminar una cuenta
router.delete('/account/:id', deleteAccount);

module.exports = router;
