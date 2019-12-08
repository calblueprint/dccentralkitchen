import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { MonoText } from './StyledText';
/**
 * @prop
 * */

function RewardsHome({ transactions, user }) {
  return (
    <View>
      <View style={styles.getStartedContainer}>
        <Text> {`Welcome, ${user.name}`}</Text>
        <MonoText>{user.points} total points </MonoText>
        <Text style={styles.getStartedText}>
          {' '}
          {`${1000 -
            (parseInt(user.points) % 1000)} points to your next reward`}
        </Text>
      </View>

      <View style={styles.tabBarInfoContainer}>
        <Text style={styles.tabBarInfoText}>Your transaction history:</Text>
        {transactions.splice(0, 3).map(transaction => {
          return (
            <View key={transaction.id}>
              <MonoText style={styles.codeHighlightText}>
                Date: {transaction.Date}
              </MonoText>
              <MonoText style={styles.codeHighlightText}>
                Points Redeemed: {transaction['Points Rewarded']}
              </MonoText>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 150,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: 3 },
        shadowOpacity: 0.1,
        shadowRadius: 3
      },
      android: {
        elevation: 20
      }
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20
  },
  navigationFilename: {
    marginTop: 5
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
    paddingVertical: 20
  }
});

export default React.memo(RewardsHome);
