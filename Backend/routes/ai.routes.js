const express = require('express');
const { generateAI_Result } = require('../controller/ai.controller');
const router = express.Router();

router.get('/get-result',generateAI_Result)

module.exports = router;