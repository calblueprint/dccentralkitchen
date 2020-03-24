import React from 'react';
import { ScrollView, View } from 'react-native';
import { Overline } from '../BaseComponents';
import Transaction from './Transaction';
/**
 * @prop
 * */

function PointsHistory({ transactions, user, updates, navigation }) {
  // Only display if transactions have mounted
  // TODO @kennethlien fix spacing at line 44
  if (transactions) {
    return (
      <ScrollView style={{ paddingLeft: '5%', paddingRight: '5%' }}>
        <Overline style={{ marginTop: 24, marginBottom: 12 }}>
          Recent Transactions
        </Overline>
        {transactions.map(transaction => (
          <Transaction
            key={transaction.id}
            date={transaction.date}
            points={transaction.points}
            storeName={transaction.storeName}
            subtotal={transaction.subtotal}
            totalSale={transaction.totalSale}
          />
        ))}
      </ScrollView>
    );
  }
  // else return
  return <View />;
}

export default React.memo(PointsHistory);
