// webhookRoutes.js

const express = require('express');
const router = express.Router();
const webhookController = require('../controllers/webhookController'); // adjust the path as needed

// Route for WooCommerce order completed webhook
router.post('/order-completed', webhookController.handleOrderCompleted);

module.exports = router;
