import React from 'react';
import { ScrollView, StyleSheet, View, Text, Button } from 'react-native';
import Transactions from './Transactions';
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
        {/* Points history */}
        <View>
          <ScrollView>
            <Text> RECENT TRANSACTIONS</Text>
            {recent.map(transaction => (
              <Transactions
                key={transaction.id}
                date={transaction.date}
                points={transaction.points}
                storeName={transaction.storeName}
              />
            ))}
            <Text> History </Text>
            {transactions.map(transaction => (
              <Transactions
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
