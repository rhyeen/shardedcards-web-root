export const roundToTwoDecimals = (num) => {
  return _roundToNDecimals(num, 2);
};

/** @TODO: find this answer online. Retrieved from phone when I didn't have internet. */
function _roundToNDecimals(value, decimals) {
  let decimalString = Number(Math.round(value + 'e' + decimals) + 'e-' + decimals).toFixed(decimals);
  if (decimalString.substr(-1) === '0') {
    if (decimalString.substr(-3) === '.00') {
      return decimalString.substr(0, decimalString.length - 3);
    }
    return decimalString.substr(0, decimalString.length - 1);
  }
  return decimalString;
}