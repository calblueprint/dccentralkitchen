import React from 'react';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Overline } from '../BaseComponents';
import Transaction from './Transaction';
/**
 * @prop
 * */

const styles = StyleSheet.create({
  signOutButton: {
    fontSize: 20,
    paddingVertical: 15
  }
});

function PointsHistory({ transactions, user, updates, navigation }) {
  // Only display if transactions have mounted
  // TODO @kennethlien fix spacing at line 44
  if (transactions) {
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
  // else return
  return <View />;
}

export default React.memo(PointsHistory);
