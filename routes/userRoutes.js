// userRoutes.js
const express = require('express');
const router = express.Router();
const User = require('../models/user');
const userController = require('../controllers/userController'); // Adjust the path as necessary

function validateId(req, res, next) {
  if (!Number.isInteger(req.params.id)) {
    return res.status(400).send('Invalid ID'); 
  }

  next();
}
function validateUserInput(req, res, next) {
  // Validate user ID
  if(!req.body.userId) {
    return res.status(400).send('User ID required');
  }

  // Validate email
  if(!req.body.userEmail) {
    return res.status(400).send('Email required');
  }

  next(); 
}
const updateUserValidator = (req, res, next) => {
  const { username, email, password } = req.body;

  // Validate username
  if (!username || username.length < 3) {
    return res.status(400).send('Username is required and should be at least 3 characters.');
  }

  // Validate email
  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    return res.status(400).send('A valid email is required.');
  }

  // Validate password
  if (!password || password.length < 6) {
    return res.status(400).send('Password is required and should be at least 6 characters.');
  }

  // If all validations pass
  next();
};

// In userRoutes.js
router.post('/update-users', updateUserValidator, userController.updateUser);


router.post('/create-users', validateUserInput, userController.createUser);





// Async route for displaying users
router.get('/show-users', async (req, res) => {
  try {
    const users = await User.find();
    res.render('show-users', { users }); // Pass the users array to the EJS template
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).send('Server Error');
  }
});
module.exports = router;