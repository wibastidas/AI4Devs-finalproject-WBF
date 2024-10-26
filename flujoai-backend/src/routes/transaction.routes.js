const express = require('express');
const {
  createTransaction,
  getTransactions,
  getTransactionById,
  updateTransaction,
  deleteTransaction,
} = require('../controllers/transaction.controller');

const router = express.Router();

// Ruta para crear una nueva transacción
router.post('/transactions', createTransaction);

// Ruta para obtener todas las transacciones
router.get('/transactions', getTransactions);

// Ruta para obtener una transacción por ID
router.get('/transactions/:id', getTransactionById);

// Ruta para actualizar una transacción por ID
router.put('/transactions/:id', updateTransaction);

// Ruta para eliminar una transacción por ID
router.delete('/transactions/:id', deleteTransaction);

module.exports = router;
