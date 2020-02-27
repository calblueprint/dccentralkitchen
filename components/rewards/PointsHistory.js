import React from 'react';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';
import { Body, Title, Caption } from '../BaseComponents';
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
        {/* Prompt to upload receipt */}
        {updates ? (
          <View style={styles.signOutContainer}>
            <Text>New transaction noted, upload your receipt!</Text>
            <Button
              title="Upload Receipt"
              onPress={() =>
                navigation.navigate('Camera', {
                  transactionId: transactions[0].id,
                  customerId: user.id
                })
              }
              style={styles.button}
            />
          </View>
        ) : (
          <Text />
        )}
        {/* end receipt prompt */}
        {/* Points history */}
        <View>
          <ScrollView style={{ marginTop: 50 }}>
            <Caption style={{ textAlign: 'center' }}>
              {' '}
              Recent Transactions
            </Caption>
            {recent.map(transaction => (
              <Transaction
                key={transaction.id}
                date={transaction.date}
                points={transaction.points}
                storeName={transaction.storeName}
              />
            ))}
            <Caption style={{ textAlign: 'center' }}>
              {' '}
              Complete History{' '}
            </Caption>
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
