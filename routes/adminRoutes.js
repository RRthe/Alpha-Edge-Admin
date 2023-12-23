// adminRoutes.js
const express = require('express');
const router = express.Router();
const adminController = require('../controllers/adminController'); // adjust the path as necessary

// Example of using a controller function in a route
router.get('/dashboard', adminController.getDashboard);

// Other routes...

module.exports = router;
