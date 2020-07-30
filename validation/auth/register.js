// Utilities
const Validator = require("validator");
const isEmpty = require("../../utils/isEmpty");

// Registering a new user
module.exports = validateRegistration = (data) => {
  const err = {};

  data.registerEmail = !isEmpty(data.registerEmail) ? data.registerEmail : "";
  data.registerName = !isEmpty(data.registerName) ? data.registerName : "";
  data.registerPassword = !isEmpty(data.registerPassword)
    ? data.registerPassword
    : "";
  data.registerPasswordConfirm = !isEmpty(data.registerPasswordConfirm)
    ? data.registerPasswordConfirm
    : "";

  // Email
  if (Validator.isEmpty(data.registerEmail)) {
    err.registerEmail = "Email field is required";
  } else if (!Validator.isEmail(data.registerEmail)) {
    err.registerEmail = "Email is not valid";
  }

  // Name
  if (Validator.isEmpty(data.registerName)) {
    err.registerName = "Name field is required";
  } else if (
    data.registerName.split(" ").length < 2 ||
    data.registerName.split(" ").length > 3
  ) {
    err.registerName = "Full name is required";
  }

  // Password
  if (Validator.isEmpty(data.registerPassword)) {
    err.registerPassword = "Password field is required";
  } else if (!Validator.isLength(data.registerPassword, { min: 8 })) {
    err.registerPassword = "Password must be at least 8 characters";
  }

  // Password confirm
  if (Validator.isEmpty(data.registerPasswordConfirm)) {
    err.registerPasswordConfirm = "Confirm password field is required";
  } else if (
    !Validator.equals(data.registerPassword, data.registerPasswordConfirm)
  )
    err.registerPasswordConfirm = "Both passwords must match";

  return {
    err,
    isValid: isEmpty(err),
  };
};
