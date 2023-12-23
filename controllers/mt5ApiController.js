const mt5ApiClient = require('../services/mt5ApiClient');

exports.createUserOnMT5 = async (req, res) => {
    try {
        const userData = req.body;
        const response = await mt5ApiClient.createUser(userData);
        res.json(response);
    } catch (error) {
        res.status(500).send("Error creating user on MT5");
    }
};
