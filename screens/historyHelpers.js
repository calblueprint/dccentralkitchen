import BASE from '../lib/common';

function createTransactionData(transaction) {
  const curr = {
    date: new Date(transaction.get('Date')),
    storeName: transaction.get('Store Name'),
    productsPurchased: transaction.get('Products Purchased'),
    points: transaction.get('Points Rewarded'),
    id: transaction.get('transaction_id')
  };
  return curr;
}

const getCustomerTransactions = function async(userId) {
  return BASE('Transactions')
    .select({
      view: 'Transactions',
      filterByFormula: `SEARCH("${userId}", {Customer})`,
      sort: [{field: "Date", direction: "desc"}],
    })
    .all()
    .then(transactions => {
      //console.log(transactions)
      let transObjs = transactions.map(transaction => createTransactionData(transaction));
      return transObjs;
    });
};

export default getCustomerTransactions;
