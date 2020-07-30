// Utilities
const mongoose = require("mongoose");

// Transaction schema
const transactionSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
  },
  account: {
    type: mongoose.Schema.ObjectId,
    ref: "Account",
  },
  amount: {
    type: Number,
    required: true,
  },
  type: {
    type: String,
    enum: ["deposit", "withdrawal"],
    required: true,
  },
  accepted: {
    type: Boolean,
    required: true,
  },
  time: {
    type: Date,
    required: true,
  },
  date: {
    type: String,
    required: true
  },
  weeklyRange: {
    type: String,
    required: true
  },
  year: {
    type: Number,
    required: true,
  },
  month: {
    type: Number,
    required: true,
  },
  week: {
    type: Number,
    required: true,
  },
  day: {
    type: Number,
    required: true,
  },
});

const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;
