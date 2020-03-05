import React from 'react';
import { Text, View } from 'react-native';
import { Body, Overline } from '../BaseComponents';
import { ProgressBar, Colors } from 'react-native-paper';
import RewardsCard from '../../components/rewards/RewardsCard';
import { Container } from '../../styled/rewards';

/**
 * @prop
 * */

function createList(N) {
  let foo = [];

  for (var i = 1; i <= N; i++) {
    foo.push(i);
  }
  return foo;
}

function RewardsHome({ transactions, user }) {
  return (
    <View>
      <Overline> REWARD PROGRESS </Overline>
      <Text
        style={{
          fontSize: 30
        }}>
        {' '}
        {parseInt(user.points) % 1000} / 1000{' '}
      </Text>
      <ProgressBar
        style={{
          flex: 0.8,
          width: '90%',
          height: 20,
          borderRadius: 20
        }}
        progress={0.9 * ((parseInt(user.points) % 1000) / 1000)}
        color={Colors.green800}
      />
      <Body>
        Earn{' '}
        {`${1000 -
          (parseInt(user.points) %
            1000)} points to unlock your next $5 reward`}{' '}
      </Body>

      <Overline>
        {' '}
        AVALIABLE REWARDS ({Math.floor(parseInt(user.points) / 1000)}){' '}
      </Overline>
      {createList(Math.floor(parseInt(user.points) / 1000)).map(a => (
        <RewardsCard></RewardsCard>
      ))}

      <RewardsCard></RewardsCard>
      <RewardsCard></RewardsCard>
    </View>
  );
}

export default React.memo(RewardsHome);
