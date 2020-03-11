import React from 'react';
import { View } from 'react-native';
import { Body, Caption, Title } from '../BaseComponents';
import { styles } from '../../styled/rewards';
import { ProgressBar } from '../rewards/ProgressBar';

/**
 * @prop
 * */

function RewardsHome({ transactions, user }) {
  return (
    <View>
      <ProgressBar percentage="50" />
      <View style={styles.getStartedContainer}>
        <Title> {`Welcome, ${user.name}`}</Title>
        <Body>{user.points} total points </Body>
        <Body style={styles.getStartedText}>
          {' '}
          {`${1000 -
            (parseInt(user.points) % 1000)} points to your next reward`}
        </Body>
      </View>

      <View style={styles.tabBarInfoContainer}>
        <Caption style={styles.tabBarInfoText}>
          Your transaction history:
        </Caption>
        {transactions.splice(0, 3).map(transaction => {
          return (
            <View key={transaction.id}>
              <Body style={styles.codeHighlightText}>
                Date: {transaction.Date}
              </Body>
              <Body style={styles.codeHighlightText}>
                Points Redeemed: {transaction['Points Rewarded']}
              </Body>
            </View>
          );
        })}
      </View>
    </View>
  );
}
export default React.memo(RewardsHome);
