const express = require('express');
const router = express.Router();
const Program = require('../models/program'); // Your Mongoose model
const { verifyWooCommerceWebhook } = require('./webhookApiSecurity'); // Hypothetical utility function

router.post('/woocommerce-webhook', async (req, res) => {
  if (!verifyWooCommerceWebhook(req)) {
    return res.status(401).send('Invalid signature');
  }

  const { order_id, products } = req.body; // Deconstruct relevant information

  // Find the associated program based on the WooCommerce product ID
  const purchasedProgram = await Program.findOne({ productId: products[0].id });
  
  if (!purchasedProgram) {
    return res.status(404).send('Program not found');
  }

  // Logic to handle the order completion, such as creating a new trading account
  // ...

  res.status(200).send('Webhook received');
});

module.exports = router;
