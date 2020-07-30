// Set up router
const express = require("express");
const router = express.Router();

// Controllers
const authController = require('../controllers/authController')

/////////////////
// Public Routes

// @route   POST api/v1/users/register
// @desc    Register user
// @access  Public
router.post("/register", authController.register);

// @route   GET api/v1/users/login
// @desc    Login User / JWT Response
// @access  Public
router.post("/login", authController.login);

module.exports = router;