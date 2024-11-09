const express = require('express');
const {
    getBalanceDistribution,
    getIncomeExpensesByDate,
    getExpensesByCategory,
    getIncomesByCategory,
    getDashboardSummary,
    getTransactions
} = require('../controllers/dashboard.controller');

const router = express.Router();

// Ruta para obtener el resumen general del dashboard
router.get('/summary', getDashboardSummary);

// Ruta para obtener el balance total y distribución por cuentas
router.get('/balance', getBalanceDistribution);

// Ruta para obtener ingresos y gastos por rango de fechas
router.get('/income-expenses', getIncomeExpensesByDate);

// Ruta para obtener distribución de gastos por categoría
router.get('/expenses-by-category', getExpensesByCategory);

// Ruta para obtener distribución de ingresos por categoría
router.get('/income-by-category', getIncomesByCategory);

// Ruta para obtener transacciones con filtros
router.get('/transactions', getTransactions);

module.exports = router;