// Utilities concerning currency calculations

// Formats currency in string format "$##.##" to number
exports.formatCurrency = (currency) => {
  return Number(currency.replace(/[^0-9.-]+/g, ""));
};

// Formats number to $#,###.## format
exports.numToCurrency = (x) => {
  const fixed = x.toFixed(2);
  const commas = fixed.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return `$${commas}`;
};
