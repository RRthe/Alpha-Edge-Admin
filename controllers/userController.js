// userController.js
const User = require('../models/user');
//const { BadRequestError, NotFoundError } = require('../errors'); 
const { createUserValidator } = require('../validators');
const bcrypt = require('bcrypt');

exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { 
      new: true, 
      runValidators: true 
    });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      message: 'User updated successfully',
      user
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};




// Hash password on server
exports.createUser = async (req, res) => {
  try {
    console.log("Password:", req.body.userPassword);

    const hashedPassword = await bcrypt.hash(req.body.userPassword, 10);

    // Validate input
    const { error } = createUserValidator(req.body);
    if (error) {
      // Check for required fields
      if (error.details.map((d) => d.context.key).includes("userId")) {
        throw new BadRequestError("User ID is required");
      }

      if (error.details.map((d) => d.context.key).includes("userEmail")) {
        throw new BadRequestError("Email is required");
      }

      // etc...

      throw new BadRequestError(error.details[0].message);
    }
  } catch (error) {
    // Handle errors
  } finally {
    // Redirect on success
    res.redirect("/users");
  }
};

exports.listUsers = async (req, res) => {
  try {
    const users = await User.find(); // Assuming User is your user model
    res.render('show-users', { users }); // Render a view and pass the users data
  } catch (error) {
    res.status(500).send('Error retrieving users');
  }
};





