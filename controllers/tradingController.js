const TradingData = require('../models/TradingData');

// Function to handle retrieving trading data for a specific user
exports.getUserTradingData = async (req, res) => {
    try {
        const userId = req.params.userId;
        const tradingData = await TradingData.find({ userId: userId });
        res.json(tradingData);
    } catch (error) {
        console.error('Error fetching trading data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

// You can add more functions for other operations like creating, updating, deleting trading data
