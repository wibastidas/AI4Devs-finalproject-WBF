const express = require('express');
const { createThread, handleQuestion } = require('../controllers/openai.controller');

const router = express.Router();

router.post('/thread', createThread);
router.post('/question', handleQuestion);

module.exports = router;
