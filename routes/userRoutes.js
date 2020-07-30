// Set up router
const express = require("express");
const router = express.Router();

// Controllers
const authController = require('../controllers/authController')
const userController = require('../controllers/userController');

/////////////////
// Public Routes

// @route   GET api/v1/users/test
// @desc    Tests users route
// @access  Public
router.get('/test', userController.test);

// @route   POST api/v1/users/register
// @desc    Register user
// @access  Public
router.post("/register", authController.register);

// @route   GET api/v1/users/login
// @desc    Login User / JWT Response
// @access  Public
router.post("/login", authController.login);

router.get('/user/:id', userController.getUser);

module.exports = router;