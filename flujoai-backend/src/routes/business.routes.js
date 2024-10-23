const express = require('express');
const { createBusiness } = require('../controllers/business.controller');

const router = express.Router();

router.post('/business', createBusiness);

module.exports = router;

