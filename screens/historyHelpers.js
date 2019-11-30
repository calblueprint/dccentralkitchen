import BASE from '../lib/common';

const getCustomerTransactions = function async(userId) {
  const transList = [];
  return BASE('Transactions')
    .select({ view: 'Transactions' })
    .all()
    .then(records => {
      const userTrans = [];
      // console.log(userId)
      records.forEach(record => {
        const currCustomerId = record.get('Customer');
        if (currCustomerId) {
          // console.log(currCustomerId[0])
          if (currCustomerId[0] === userId) {
            userTrans.push(record);
          }
        }
      });
      return Promise.all(userTrans);
    })
    .then(transactions => {
      transactions.forEach(transaction => {
        const curr = {
          date: new Date(transaction.get('Date')),
          storeName: transaction.get('Store Name'),
          productsPurchased: transaction.get('Products Purchased'),
          points: transaction.get('Points Rewarded'),
          id: transaction.get('transaction_id')
        };
        transList.push(curr);
      });
      transList.sort(function compare(a, b) {
        return new Date(b.date) - new Date(a.date);
      });
      //   console.log(transList);
      return transList;
    });
};

export default getCustomerTransactions;
