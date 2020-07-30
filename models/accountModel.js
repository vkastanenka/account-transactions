// Utilities
const mongoose = require("mongoose");

// Account schema
const accountSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.ObjectId,
      ref: "User",
    },
    total: {
      type: Number,
      required: true,
      default: 0,
    },
    deposit_history: { type: mongoose.Schema.Types.Mixed, default: {} },
    withdrawal_history: { type: mongoose.Schema.Types.Mixed, default: {} },
  },
  {
    minimize: false,
  }
);

const Account = mongoose.model('Account', accountSchema);

module.exports = Account;