// Set up router
const express = require("express");
const router = express.Router();

// Controllers
const authController = require("../controllers/authController");
const transactionController = require("../controllers/transactionController");

/////////////////
// Public Routes

// @route   GET api/v1/transactions/test
// @desc    Tests transactions route
// @access  Public
router.get("/test", transactionController.test);

////////////////////
// Protected Routes

router.use(authController.protect);

// @route   Post api/v1/transactions/deposit
// @desc    Deposits a requested amount
// @access  Private
router.post("/deposit", transactionController.deposit);

// @route   Post api/v1/transactions/withdraw
// @desc    Withdraws a requested amount
// @access  Private
router.post("/withdraw", transactionController.withdraw);

module.exports = router;
