import { rewardPointValue } from '../constants/Rewards';
import { getAllTransactions } from './airtable/request';

// Transform date to Date object
function updateTransactionData(record) {
  const rewardsUnlocked = parseInt(
    ((record.currentPoints % rewardPointValue) + record.pointsEarned) /
      rewardPointValue
  );
  return { ...record, rewardsUnlocked, date: new Date(record.date) };
}

export async function getCustomerTransactions(customerId) {
  const transactions = await getAllTransactions(
    `SEARCH("${customerId}", {Customer})`,
    [{ field: 'Date', direction: 'desc' }]
  );

  return transactions.map(updateTransactionData);
}

export default getCustomerTransactions;
