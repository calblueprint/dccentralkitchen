import BASE from './common';

function createTransactionData(record) {
  const transaction = record.fields;
  return {
    id: transaction.id,
    customer: transaction.Customer,
    // TODO not entirely sure why this was converted to a Date object
    date: new Date(transaction.Date),
    points: transaction['Points Rewarded'],
    storeName: transaction['Store Name'],
    productsPurchased: transaction['Products Purchased'],
    phone: transaction['Customer Lookup (Phone #)'],
    clerk: transaction.Clerk,
    itemsRedeemed: transaction['Items Redeemed'],
    customerName: transaction['Customer Name'],
    totalSale: transaction['Total Price']
  };
}
export function displayDollarValue(amount, positive = true) {
  const dollarValue = '$'.concat(amount.toFixed(2).toString());
  if (positive) {
    return dollarValue;
  }
  return '-'.concat(dollarValue);
}

// Calls Airtable API to return a promise that
// will resolve to be a user record.
function getUser(id) {
  return BASE('Customers').find(id);
}

const getCustomerTransactions = function async(userId) {
  return BASE('Transactions')
    .select({
      filterByFormula: `SEARCH("${userId}", {Customer})`,
      sort: [{ field: 'Date', direction: 'desc' }]
    })
    .all()
    .then(transactions => {
      const transObjs = transactions.map(transaction =>
        createTransactionData(transaction)
      );
      return transObjs;
    });
};

export { getCustomerTransactions, getUser };
