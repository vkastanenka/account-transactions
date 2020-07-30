// Utilities concerning the formatting of dates

// Returns the week number of the year of a date
const getWeek = (date) => {
  var target = new Date(date.valueOf()),
    dayNumber = (date.getUTCDay() + 6) % 7,
    firstThursday;

  target.setUTCDate(target.getUTCDate() - dayNumber + 3);
  firstThursday = target.valueOf();
  target.setUTCMonth(0, 1);

  if (target.getUTCDay() !== 4) {
    target.setUTCMonth(0, 1 + ((4 - target.getUTCDay() + 7) % 7));
  }

  return Math.ceil((firstThursday - target) / (7 * 24 * 3600 * 1000)) + 1;
};

// Returns a loads day of the week, week of the year, month, and year
exports.getLoadDateInfo = (loadTime) => {
  const loadDate = new Date(loadTime);
  let weekStartDate;
  let weekEndDate;

  // Load's day of the week
  const day = loadDate.getUTCDay();

  // Load's week the year
  const week = getWeek(loadDate);

  // Load's month
  const month = loadDate.getUTCMonth();

  // Load's year
  const year = loadDate.getUTCFullYear();

  // Load's date
  const dateUTC = loadDate.getUTCDate();
  const date = `${month + 1}/${dateUTC}/${year}`;

  // Load's weekly range
  switch (day) {
    case 0:
      weekStartDate = `${month + 1}/${dateUTC - 6}/${year}`;
      weekEndDate = `${month + 1}/${dateUTC}/${year}`;
      break;
    case 1:
      weekStartDate = `${month + 1}/${dateUTC}/${year}`;
      weekEndDate = `${month + 1}/${dateUTC + 6}/${year}`;
      break;
    case 2:
      weekStartDate = `${month + 1}/${dateUTC - 1}/${year}`;
      weekEndDate = `${month + 1}/${dateUTC + 5}/${year}`;
      break;
    case 3:
      weekStartDate = `${month + 1}/${dateUTC - 2}/${year}`;
      weekEndDate = `${month + 1}/${dateUTC + 4}/${year}`;
      break;
    case 4:
      weekStartDate = `${month + 1}/${dateUTC - 3}/${year}`;
      weekEndDate = `${month + 1}/${dateUTC + 3}/${year}`;
      break;
    case 5:
      weekStartDate = `${month + 1}/${dateUTC - 4}/${year}`;
      weekEndDate = `${month + 1}/${dateUTC + 2}/${year}`;
      break;
    case 6:
      weekStartDate = `${month + 1}/${dateUTC - 5}/${year}`;
      weekEndDate = `${month + 1}/${dateUTC + 1}/${year}`;
      break;
    default:
      weekStartDate = undefined;
      weekEndDate = undefined;
  }

  const weeklyRange = `${weekStartDate} - ${weekEndDate}`;

  return { day, week, month, year, date, weeklyRange, time: loadTime };
};
