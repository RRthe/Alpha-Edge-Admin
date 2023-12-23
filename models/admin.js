// Require the mongoose package to set up the schema and model
const mongoose = require('mongoose');

// Define the schema for the admin data
// This schema will dictate the structure of the documents in the corresponding MongoDB collection
const adminSchema = new mongoose.Schema({
  // Define a username field which is of type String
  username: {
    type: String,
    required: [true, 'Username is required'], // Validator to ensure this field is not empty
    unique: true, // Ensure that the username is unique in the collection
    trim: true, // Trim whitespace from the username
  },
  // Define a password field which is of type String
  password: {
    type: String,
    required: [true, 'Password is required'],
    // You might want to add more security features here, like minlength or a custom validator
  },
  // You can add additional fields as required for your admin model
  // For example, an email field:
  // email: {
  //   type: String,
  //   required: [true, 'Email is required'],
  //   unique: true,
  //   lowercase: true, // Convert email to lowercase
  //   // Validate the email format (basic validation)
  //   validate: {
  //     validator: function(v) {
  //       return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v);
  //     },
  //     message: props => `${props.value} is not a valid email!`
  //   }
  // },
});

// Create a model from the schema
// The model will allow you to interact with a collection of 'admins' in the database
const Admin = mongoose.model('Admin', adminSchema); // Conventionally model names are singular and capitalized

// Export the Admin model so it can be used in other parts of your application
module.exports = Admin;
