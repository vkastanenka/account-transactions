// Utilities
const currency = require("../utils/currency");

exports.createTransUpdateAcc = async (
  accepted,
  type,
  transInfo,
  account,
  Transaction
) => {
  // Transaction details object to save to document
  const transactionDetails = {
    customer: account.customer,
    account: account._id,
    amount: transInfo.amount,
    type,
    accepted,
    time: transInfo.dateInfo.time,
    date: transInfo.dateInfo.date,
    weeklyRange: transInfo.dateInfo.weeklyRange,
    year: transInfo.dateInfo.year,
    month: transInfo.dateInfo.month,
    week: transInfo.dateInfo.week,
    day: transInfo.dateInfo.day,
  };

  if (accepted && type === "deposit") {
    account.total += transInfo.amount;
  } else if (accepted && type === "withdrawal") {
    account.total -= transInfo.amount;
  }

  // Create transaction document / update account history and save
  const newTransaction = new Transaction(transactionDetails);
  account[`${type}_history`][newTransaction._id] = newTransaction;
  await newTransaction.save();
  await account.markModified([`${type}_history`]);
  await account.save({ validateBeforeSave: false });
};
