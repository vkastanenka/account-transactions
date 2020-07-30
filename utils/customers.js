// Utilities concerning the creation and update of customer objects and data structures

// Creates a history object for a load
const createLoadHistory = (reqLoad, accepted) => ({
  year: reqLoad.dateInfo.year,
  month: reqLoad.dateInfo.month,
  week: reqLoad.dateInfo.week,
  day: reqLoad.dateInfo.day,
  load: reqLoad.load,
  accepted,
});

// Creates a customer's load history to assign to customer_id
exports.createInitialCustomer = (reqLoad, accepted) => ({
  load_history: { [reqLoad.load.id]: createLoadHistory(reqLoad, accepted) },
});

exports.createLoadHistory = createLoadHistory;
