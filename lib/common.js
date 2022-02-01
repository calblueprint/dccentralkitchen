/* eslint-disable import/prefer-default-export */
export function displayDollarValue(amount, positive = true) {
  const dollarValue = '$'.concat(amount.toFixed(2).toString());
  if (positive) {
    return dollarValue;
  }
  return '-'.concat(dollarValue);
}
