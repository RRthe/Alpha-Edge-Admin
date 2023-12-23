const express = require('express');
const router = express.Router();
const mt4Controller = require('../controllers/mt4Controller');

router.post('/createUser', mt4Controller.createUserOnMT4);

module.exports = router;
