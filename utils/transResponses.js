// Utilities concerning responding to incoming loads
const currency = require("./currency");

// Formats responses for loads
exports.loadResponses = (load) => {
  const rejectedLoad = {
    id: load.id,
    customer_id: load.customer_id,
    accepted: false,
  };

  const acceptedLoad = {
    id: load.id,
    customer_id: load.customer_id,
    accepted: true,
  };

  return {
    rejectedLoad,
    acceptedLoad,
    rejectedLoadText: JSON.stringify(rejectedLoad),
    acceptedLoadText: JSON.stringify(acceptedLoad),
  };
};

exports.transOverDayRes = (type, transAmount) => ({
  msg: `Transaction is over the daily ${type} limit!`,
  limit: `Daily ${type} limit: ${currency.numToCurrency(5000)}`,
  transReq: `Requested amount: ${currency.numToCurrency(transAmount)}`,
  discrepancy: `Discrepancy: ${currency.numToCurrency(transAmount - 5000)}`,
});

exports.firstDepositOK = (transAmount) => ({
  msg: "Deposit successful!",
  transReq: `Requested amount: ${currency.numToCurrency(transAmount)}`,
  numDayTransLeft: `Number of deposit transactions remaining for today: 2`,
  updatedDayLimit: `Updated daily limit: ${currency.numToCurrency(
    5000 - transAmount
  )}`,
  updatedWeekLimit: `Updated weekly limit: ${currency.numToCurrency(
    20000 - transAmount
  )}`,
});

exports.transOK = (type, transAmount, numDayTrans, dayLimit, weekLimit) => ({
  msg: `${type} successful!`,
  transReq: `Requested amount: ${currency.numToCurrency(transAmount)}`,
  numDayTransLeft: `Number of ${type} transactions remaining for today: ${
    3 - 1 - numDayTrans
  }`,
  updatedDayLimit: `Updated daily limit: ${currency.numToCurrency(
    Math.abs(dayLimit)
  )}`,
  updatedWeekLimit: `Updated weekly limit: ${currency.numToCurrency(
    Math.abs(weekLimit)
  )}`,
});

exports.overNumTransRes = (type, limit, transactions) => ({
  msg: `Account has performed maximum daily number of ${type} transactions! (${limit})`,
});

exports.overLimitRes = (
  type,
  period,
  transLimit,
  transSum,
  transAmount,
  transDifference
) => ({
  msg: `Transaction is over the ${period} ${type} limit!`,
  limit: `Current ${period} limit: ${currency.numToCurrency(transLimit)}`,
  currentTransTotal: `Current ${period} total: ${currency.numToCurrency(
    transSum
  )}`,
  transReq: `Requested amount: ${currency.numToCurrency(transAmount)}`,
  discrepancy: `Discrepancy: ${currency.numToCurrency(transDifference)}`,
});

exports.insufficientFundsRes = (accTotal, transAmount) => ({
  msg: "Account has insufficient funds for this transaction!",
  limit: `Current account funds: ${currency.numToCurrency(accTotal)}`,
  transReq: `Requested amount: ${currency.numToCurrency(transAmount)}`,
  discrepancy: `Discrepancy: ${currency.numToCurrency(transAmount - accTotal)}`,
});
