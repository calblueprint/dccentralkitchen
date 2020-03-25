import React from 'react';
import { ScrollView, View } from 'react-native';
import { Overline } from '../BaseComponents';
import Transaction from './Transaction';

/**
 * @prop
 * */

function PointsHistory({ transactions }) {
  // TODO @kennethlien fix spacing at line 44

  return (
    <View>
      <View>
        <ScrollView>
          <Overline style={{ marginTop: 24 }}>Recent Transactions</Overline>
          {transactions.map(transaction => (
            <Transaction
              key={transaction.id}
              date={transaction.date}
              points={transaction.points}
              storeName={transaction.storeName}
            />
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

export default React.memo(PointsHistory);
