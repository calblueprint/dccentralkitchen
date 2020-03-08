import React from 'react';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';
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
  if (transactions) {
    const recent = transactions.splice(0, 3);
    return (
      <View>
        {/* Points history */}
        <View>
          <ScrollView style={{ marginTop: 50 }}>
            <Text style={{ textAlign: 'center' }}> Recent Transactions</Text>
            {recent.map(transaction => (
              <Transaction
                key={transaction.id}
                date={transaction.date}
                points={transaction.points}
                storeName={transaction.storeName}
              />
            ))}
            <Text style={{ textAlign: 'center' }}> Complete History </Text>
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
