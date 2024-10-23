const express = require('express');
const { createAccount } = require('../controllers/account.controller');

const router = express.Router();

router.post('/account', createAccount);

module.exports = router;
