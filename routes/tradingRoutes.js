const express = require('express');
const router = express.Router();
const tradingController = require('../controllers/tradingController');

// Route to get trading data for a specific user
router.get('/trading-data/:userId', tradingController.getUserTradingData);

module.exports = router;
