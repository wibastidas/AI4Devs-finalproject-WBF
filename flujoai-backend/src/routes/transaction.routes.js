const express = require('express');
const { createTransaction } = require('../controllers/transaction.controller');

const router = express.Router();

router.post('/api/transactions', createTransaction);

module.exports = router;

