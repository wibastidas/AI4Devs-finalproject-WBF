const express = require('express');
const {
    getBalanceDistribution,
    getIncomeExpensesByDate,
    getExpensesByCategory,
    getIncomesByCategory
} = require('../controllers/dashboard.controller');

const router = express.Router();

// Ruta para obtener el balance total y distribución por cuentas
router.get('/dashboard/balance', getBalanceDistribution);

// Ruta para obtener ingresos y gastos por rango de fechas
router.get('/dashboard/transactions', getIncomeExpensesByDate);

// Ruta para obtener distribución de gastos por categoría
router.get('/dashboard/expenses-by-category', getExpensesByCategory);

// Ruta para obtener distribución de ingresos por categoría
router.get('/dashboard/income-by-category', getIncomesByCategory);

module.exports = router;
