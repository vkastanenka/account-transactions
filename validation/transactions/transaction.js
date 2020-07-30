// Utilities
const Validator = require("validator");
const isEmpty = require("../../utils/isEmpty");

// Making a deposit or withdrawal
module.exports = validateTransaction = (data) => {
  const err = {};

  data.amount = !isEmpty(data.amount) ? data.amount : "";

  // Amount
  if (data.amount === 0) {
    err.amount = "Transaction amount is required!";
  } else if (data.amount < 0) {
    err.amount = "Transaction must be positive!";
  }

  return {
    err,
    isValid: isEmpty(err),
  };
};
