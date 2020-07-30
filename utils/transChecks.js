// Utilities concerning checking load viability


// Checks if a transaction will exceed a defined limit or not
transTotalCheck = (transArr, transLimit, transAmount) => {
  let accepted;
  let transSum = 0;
  transArr.forEach((trans) => (transSum += trans.amount));

  const transTotal = transSum + transAmount;
  const transDifference = transTotal - transLimit;

  if (transDifference > 0) accepted = false;
  else accepted = true;

  return { transLimit, transSum, transDifference, transTotal, accepted };
};

exports.allTransactionChecks = (accountHistory, transInfo) => {
  const accountHistoryValues = Object.values(accountHistory);

  // Filtering out transaction history by week
  const transWeekFilter = accountHistoryValues.filter((trans) => {
    if (
      trans.year === transInfo.dateInfo.year &&
      trans.month === transInfo.dateInfo.month &&
      trans.week === transInfo.dateInfo.week &&
      trans.accepted
    )
      return true;
  });

  // Checks if transInfos's week exceeds the weekly limit
  const overWeeklyLimit = transTotalCheck(
    transWeekFilter,
    20000,
    transInfo.amount
  );

  // Filtering out transaction history by transInfo's day
  const transDayFilter = transWeekFilter.filter(
    (trans) => trans.day === transInfo.dateInfo.day
  );

  // Checks if transInfo's day exceeds the daily limit
  const overDailyLimit = transTotalCheck(transDayFilter, 5000, transInfo.amount);

  return {
    daysTrans: transDayFilter,
    overWeeklyLimit,
    numDayTrans: transDayFilter.length,
    overDailyLimit,
  };
};

exports.transTotalCheck = transTotalCheck;
