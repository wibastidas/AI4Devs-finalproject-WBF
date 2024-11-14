const express = require('express');
const { createThread, handleQuestion } = require('../controllers/openai.controller');

const router = express.Router();

router.post('/create-thread', createThread);
router.post('/user-question', handleQuestion);

module.exports = router;
