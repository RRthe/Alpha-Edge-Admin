const mt4ApiClient = require('../services/mt4ApiClient');

exports.createUserOnMT4 = async (req, res) => {
    try {
        const userData = req.body;
        const response = await mt4ApiClient.createUser(userData);
        res.json(response);
    } catch (error) {
          console.error("Error in createUserOnMT4:", error);
          res.status(500).send("Error creating user on MT4: " + error.message);
    }

};
