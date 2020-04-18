import { getAllTransactions } from './airtable/request';

// Transform date to Date object
function updateTransactionData(record) {
  return { ...record, date: new Date(record.date) };
}

export async function getCustomerTransactions(customerId) {
  const transactions = await getAllTransactions(
    `SEARCH("${customerId}", {Customer})`,
    [{ field: 'Date', direction: 'desc' }]
  );

  return transactions.map(updateTransactionData);
}

export default getCustomerTransactions;
