// Utilities
const catchAsync = require("../utils/catchAsync");

// Models
const User = require("../models/userModel");

////////////////
// Public Routes

// @route   GET api/v1/users/test
// @desc    Tests users route
// @access  Public
exports.test = (req, res, next) => {
  return res.status(200).json({ message: "Users route secured!" });
};

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id).populate('account_history');
  return res.status(200).json(user);
});
