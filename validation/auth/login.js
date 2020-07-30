// Utilities
const Validator = require("validator");
const isEmpty = require("../../utils/isEmpty");

// Logging a user in
module.exports = validateLogin = (data) => {
  const err = {};

  data.loginEmail = !isEmpty(data.loginEmail) ? data.loginEmail : "";
  data.loginPassword = !isEmpty(data.loginPassword) ? data.loginPassword : "";

  // Email
  if (Validator.isEmpty(data.loginEmail)) {
    err.loginEmail = "Email field is required";
  } else if (!Validator.isEmail(data.loginEmail)) {
    err.loginEmail = "Email is not valid";
  }

  // Password
  if (Validator.isEmpty(data.loginPassword)) {
    err.loginPassword = "Password field is required";
  } else if (!Validator.isLength(data.loginPassword, { min: 8 })) {
    err.loginPassword = "Password must be at least 8 characters";
  }

  return {
    err,
    isValid: isEmpty(err),
  };
};
