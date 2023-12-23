const mongoose = require('mongoose');

const TradingDataSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'  // Replace 'User' with the name of your user model
  },
  month: {
    type: String,
    required: true,
    // You can add a regex to validate the month format, e.g., 'YYYY-MM'
  },
  profitLoss: {
    type: Number,
    required: true
    // You can add min/max or other validators if needed
  },
  // Add other fields as necessary
}, {
  timestamps: true  // Adds createdAt and updatedAt fields automatically
});

module.exports = mongoose.model('TradingData', TradingDataSchema);
