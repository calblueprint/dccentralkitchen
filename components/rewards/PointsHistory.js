import React from 'react';
import { ScrollView } from 'react-native';
import { Overline } from '../BaseComponents';
import Transaction from './Transaction';

/**
 * @prop
 * */

function PointsHistory({ transactions }) {
  return (
    <ScrollView style={{ marginLeft: 16, paddingRight: 16 }}>
      <Overline style={{ marginTop: 24, marginBottom: 12 }}>
        Recent Transactions
      </Overline>
      {transactions.map(transaction => (
        <Transaction
          key={transaction.id}
          date={transaction.date}
          pointsEarned={transaction.pointsEarned}
          storeName={transaction.storeName}
          subtotal={transaction.subtotal}
          totalSale={transaction.totalSale}
        />
      ))}
    </ScrollView>
  );
}

export default React.memo(PointsHistory);
