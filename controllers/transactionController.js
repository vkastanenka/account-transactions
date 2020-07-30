// Utilities
const dateUtils = require("../utils/dates");
const transRes = require("../utils/transResponses");
const writeDocuments = require("../utils/writeDocuments");
const transCheckUtils = require("../utils/transChecks");

// Error Handling
const catchAsync = require("../utils/catchAsync");

// Validation
const validateTransaction = require("../validation/transactions/transaction");

// Models
const Account = require("../models/accountModel");
const Transaction = require("../models/transactionModel");
const User = require("../models/userModel");

/////////////////
// Public Routes

// @route   GET api/v1/transactions/test
// @desc    Tests transactions route
// @access  Public
exports.test = (req, res, next) => {
  return res.status(200).json({ message: "Transactions route secured!" });
};

////////////////////
// Protected Routes

// @route   Post api/v1/transactions/deposit
// @desc    Deposits a requested amount
// @access  Protected
exports.deposit = catchAsync(async (req, res, next) => {
  // Validate inputs
  const { err, isValid } = validateTransaction(req.body);
  if (!isValid) return res.status(400).json(err);

  // Format transaction info
  const transInfo = {
    amount: req.body.amount,
    dateInfo: dateUtils.getLoadDateInfo(req.body.time),
  };

  // Find account
  const account = await Account.findById(req.user.account._id);

  ////////////
  // Check #1 => Does incoming transaction exceed the daily limit? (5000)

  if (transInfo.amount > 5000) {
    // Create transaction document / update account history and save
    await writeDocuments.createTransUpdateAcc(
      false,
      "deposit",
      transInfo,
      account,
      Transaction
    );

    // Repond
    return res
      .status(400)
      .json(transRes.transOverDayRes("deposit", transInfo.amount));
  }

  // If account has no deposit history
  if (!Object.keys(account.deposit_history).length) {
    // Create transaction document / update account history and save
    await writeDocuments.createTransUpdateAcc(
      true,
      "deposit",
      transInfo,
      account,
      Transaction
    );

    // Update user JWT and send with response
    const user = await User.findById(req.user._id).populate("account");
    const token = createJWT(user);

    // Respond
    return res
      .status(200)
      .json({ transDetails: transRes.firstDepositOK(transInfo.amount), token });
  }

  ////////////
  // Check #2 => With this transaction type, will the account exceed $20000 weekly limit?

  ////////////
  // Check #3 => With this transaction type, will the account exceed 3 transactions in one day?

  ////////////
  // Check #4 => With this transaction type, will the account exceed $5000 daily limit?

  const transChecks = transCheckUtils.allTransactionChecks(
    account.deposit_history,
    transInfo
  );

  if (
    transChecks.numDayTrans === 3 ||
    !transChecks.overWeeklyLimit.accepted ||
    !transChecks.overDailyLimit.accepted
  ) {
    // Create transaction document / update account history and save
    await writeDocuments.createTransUpdateAcc(
      false,
      "deposit",
      transInfo,
      account,
      Transaction
    );
  }

  // Send back proper responses
  if (transChecks.numDayTrans === 3) {
    return res.status(400).json(transRes.overNumTransRes("deposit", 3));
  } else if (!transChecks.overWeeklyLimit.accepted) {
    return res
      .status(400)
      .json(
        transRes.overLimitRes(
          "deposit",
          "weekly",
          transChecks.overWeeklyLimit.transLimit,
          transChecks.overWeeklyLimit.transSum,
          transInfo.amount,
          transChecks.overWeeklyLimit.transDifference
        )
      );
  } else if (!transChecks.overDailyLimit.accepted) {
    return res
      .status(400)
      .json(
        transRes.overLimitRes(
          "deposit",
          "daily",
          transChecks.overDailyLimit.transLimit,
          transChecks.overDailyLimit.transSum,
          transInfo.amount,
          transChecks.overDailyLimit.transDifference
        )
      );
  }

  // Create transaction document / update account history and save
  await writeDocuments.createTransUpdateAcc(
    true,
    "deposit",
    transInfo,
    account,
    Transaction
  );

  // Update user JWT and send with response
  const user = await User.findById(req.user._id).populate("account");
  const token = createJWT(user);

  // Respond
  return res.status(200).json({
    transDetails: transRes.transOK(
      "Deposit",
      transInfo.amount,
      transChecks.daysTrans.length,
      transChecks.overDailyLimit.transDifference,
      transChecks.overWeeklyLimit.transDifference
    ),
    token,
  });
});

// @route   Post api/v1/transactions/withdraw
// @desc    Withdraws a requested amount
// @access  Protected
exports.withdraw = catchAsync(async (req, res, next) => {
  // Validate inputs
  const { err, isValid } = validateTransaction(req.body);
  if (!isValid) return res.status(400).json(err);

  // Format transaction info
  const transInfo = {
    amount: req.body.amount,
    dateInfo: dateUtils.getLoadDateInfo(req.body.time),
  };

  // Find account
  const account = await Account.findById(req.user.account._id);

  ////////////
  // Check #1 => Does incoming transaction exceed the daily limit? (5000)

  if (transInfo.amount > 5000) {
    // Create transaction document / update account history and save
    await writeDocuments.createTransUpdateAcc(
      false,
      "withdrawal",
      transInfo,
      account,
      Transaction
    );

    // Repond
    return res
      .status(400)
      .json(transRes.transOverDayRes("withdraw", transInfo.amount));
  }

  ////////////
  // Check #2 => Does the account have enough to withdraw?

  if (account.total < transInfo.amount) {
    await writeDocuments.createTransUpdateAcc(
      false,
      "withdrawal",
      transInfo,
      account,
      Transaction
    );

    // Respond
    return res
      .status(400)
      .json(transRes.insufficientFundsRes(account.total, transInfo.amount));
  }

  ////////////
  // Check #3 => With this transaction type, will the account exceed $20000 weekly limit?

  ////////////
  // Check #4 => With this transaction type, will the account exceed 3 transactions in one day?

  ////////////
  // Check #5 => With this transaction type, will the account exceed $5000 daily limit?

  const transChecks = transCheckUtils.allTransactionChecks(
    account.withdrawal_history,
    transInfo
  );

  if (
    transChecks.numDayTrans === 3 ||
    !transChecks.overWeeklyLimit.accepted ||
    !transChecks.overDailyLimit.accepted
  ) {
    // Create transaction document / update account history and save
    await writeDocuments.createTransUpdateAcc(
      false,
      "withdrawal",
      transInfo,
      account,
      Transaction
    );
  }

  // Send back proper responses
  if (transChecks.numDayTrans === 3) {
    return res.status(400).json(transRes.overNumTransRes("withdrawal", 3));
  } else if (!transChecks.overWeeklyLimit.accepted) {
    return res
      .status(400)
      .json(
        transRes.overLimitRes(
          "withdrawal",
          "weekly",
          transChecks.overWeeklyLimit.transLimit,
          transChecks.overWeeklyLimit.transSum,
          transInfo.amount,
          transChecks.overWeeklyLimit.transDifference
        )
      );
  } else if (!transChecks.overDailyLimit.accepted) {
    return res
      .status(400)
      .json(
        transRes.overLimitRes(
          "withdrawal",
          "daily",
          transChecks.overDailyLimit.transLimit,
          transChecks.overDailyLimit.transSum,
          transInfo.amount,
          transChecks.overDailyLimit.transDifference
        )
      );
  }

  // All checks passed, create transaction document and update account
  await writeDocuments.createTransUpdateAcc(
    true,
    "withdrawal",
    transInfo,
    account,
    Transaction
  );

  // Update user JWT and send with response
  const user = await User.findById(req.user._id).populate("account");
  const token = createJWT(user);

  // Respond
  return res.status(200).json({
    transDetails: transRes.transOK(
      "Withdrawal",
      transInfo.amount,
      transChecks.daysTrans.length,
      transChecks.overDailyLimit.transDifference,
      transChecks.overWeeklyLimit.transDifference
    ),
    token,
  });
});
