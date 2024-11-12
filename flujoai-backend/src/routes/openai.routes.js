const express = require('express');
const { generateText } = require('../controllers/openai.controller');

const router = express.Router();

router.post('/generate-text', generateText);

module.exports = router;
