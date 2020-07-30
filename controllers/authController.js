// Utilities
const jwt = require("jsonwebtoken");
const { promisify } = require("util");
const createJWT = require("../utils/jwtGenerator");

// Error Handling
const catchAsync = require("../utils/catchAsync.js");

// Validation
const validateLogin = require("../validation/auth/login");
const validateRegistration = require("../validation/auth/register");

// Models
const User = require("../models/userModel");
const Account = require("../models/accountModel");

//////////////
// Middleware

// Protecting routes for logged in users => Assigns req.user
exports.protect = catchAsync(async (req, res, next) => {
  const err = {};

  // Assigning the token based on headers or localStorage
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  // else if (localStorage.jwtToken) {
  //   token = localStorage.jwtToken;
  // }

  // Check if the token exists
  if (!token) {
    err.noToken = "You are not logged in! Please log in to gain access.";
    return res.status(401).json(err);
  }

  // Verify the token against its secret
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // Find the user with the ID encoded in the JWT
  const currentUser = await User.findById(decoded._id).populate("account");

  // Check if user still exists
  if (!currentUser) {
    err.noUser = "The user related to this token no longer exists";
    return res.status(401).json(err);
  }

  // Assign currentUser to req.user to be used in protected route functions
  req.user = currentUser;
  next();
});

// Restricts controller actions to specified roles
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    const err = {};

    // If the user's role is not included in the argument, deny access
    if (!roles.includes(req.user.role)) {
      err.unauthorized = "You do not have permission to perform this action";
      return res.status(403).json(err);
    }

    next();
  };
};

/////////////////
// Public Routes

// @route   POST api/v1/users/register
// @desc    Register user
// @access  Public
exports.register = catchAsync(async (req, res, next) => {
  // Validate inputs
  const { err, isValid } = validateRegistration(req.body);
  if (!isValid) return res.status(400).json(err);

  // Check if email is already taken
  const userCheck = await User.findOne({ email: req.body.registerEmail });
  if (userCheck) {
    err.registerEmail = "Email already taken";
    return res.status(400).json(err);
  }

  // Create new user
  const newUser = await User.create({
    email: req.body.registerEmail,
    name: req.body.registerName,
    password: req.body.registerPassword,
    passwordConfirm: req.body.registerPasswordConfirm,
  });

  // Create account for the user
  const newAccount = await Account.create({
    customer: newUser._id,
  });

  // Add new account id to user document
  newUser.account = newAccount._id;
  await newUser.save({ validateBeforeSave: false });

  // Respond
  res.status(201).json({ status: "success", newUser, newAccount });
});

// @route   GET api/v1/users/login
// @desc    Login User / JWT Response
// @access  Public
exports.login = catchAsync(async (req, res, next) => {
  // Validate inputs
  const { err, isValid } = validateLogin(req.body);
  if (!isValid) return res.status(400).json(err);

  // Isolate login email and password
  const { loginEmail, loginPassword } = req.body;

  // Find user
  const user = await User.findOne({ email: loginEmail })
    .select("+password")
    .populate("account");

  // Check if either the email or password are incorrect
  if (!user || !(await user.correctPassword(loginPassword, user.password))) {
    err.loginEmail = "Email and/or password are incorrect";
    err.loginPassword = "Email and/or password are incorrect";
    return res.status(400).json(err);
  }

  // Create the JWT => Entire user document
  const token = createJWT(user);

  // Respond
  res.status(200).json({ status: "success", token, user });
});
