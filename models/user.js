// User model schema example
// user.model.js

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
  userName: { 
    type: String, 
    required: true, 
    unique: true,
    trim: true  
  },
  email: {
    type: String,
    required: true, 
    unique: true,
    match: /^\S+@\S+\.\S+$/
  },
  password: { 
    type: String,
    required: true
  },
  firstName: { 
    type: String,
    required: true,
    trim: true
  }
});

// Hash password before saving 
userSchema.pre('save', async function(next) {
  const user = this;
  if (user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

// Indexes for faster lookups
userSchema.index({ userName: 1 }); 
userSchema.index({ email: 1 });

const User = mongoose.model('User', userSchema);

module.exports = User;
