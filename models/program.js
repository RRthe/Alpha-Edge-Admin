// models/program.js

const mongoose = require('mongoose');

// Define the schema for the program settings
const programSchema = new mongoose.Schema({
  programName: {
    type: String,
    required: true,
    trim: true
  },
  brokerUsername: {
    type: String,
    required: true
  },
  accountPlatform: {
    type: String,
    enum: ['MT4', 'MT5'],
    required: true
  },
  tradeServerIP: String,
  tradeServerGroup: String,
  leverage: Number,
  initialBalance: Number,
  maxCalendarDaysToReachTarget: Number,
  minCalendarDaysToReachTarget: Number,
  overallBalanceDrawdownAllowed: Number,
  overallEquityDrawdownAllowed: Number,
  dailyBalanceDrawdownAllowed: Number,
  includeFloatingPLInDailyBalanceDD: Boolean,
  growthTargetForBalance: Number,
  numberRetakesAllowed: {
    type: Number,
    default: 0
  },
  nextStageProgram: String, // This could be a reference ID to another program
  adminEmails: {
    maxTradingDaysAlert: String,
    minTargetDaysAlert: String,
    overallBalanceDrawdownAlert: String,
    overallEquityDrawdownAlert: String,
    dailyBalanceDrawdownAlert: String,
    traderReachesTargetAlert: String,
    newApplicationsAlert: String
  },
  otherDetails: String,
  woocommerceProductId: String
}, {
  timestamps: true // Adds createdAt and updatedAt timestamps
});

// Create the model from the schema
const Program = mongoose.model('Program', programSchema);

module.exports = Program;
