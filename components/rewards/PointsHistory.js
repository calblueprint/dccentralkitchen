import PropTypes from 'prop-types';
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
  // else return
  return <View />;
}

PointsHistory.propTypes = {
  transactions: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  updates: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
};

export default React.memo(PointsHistory);
