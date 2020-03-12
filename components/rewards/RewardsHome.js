import React from 'react';
import { View, ScrollView, Text } from 'react-native';
import { Body, Overline, Title } from '../BaseComponents';
import {
  styles,
  ProgressBarContainer,
  RewardCardContainer
} from '../../styled/rewards';
import { ProgressBar } from 'react-native-paper';
import RewardTab from './RewardTab';
import Colors from '../../assets/Colors';

/**
 * @prop
 * */

function createPairs(N) {
  let foo = [];
  for (var i = 1; i <= N / 2; i++) {
    foo.push(i);
  }
  return foo;
}

function createSingle(N) {
  let foo = [];
  if (N % 2 == 1) {
    foo.push(1);
  }
  return foo;
}
// TODO @kennethlien to fix infinite scroll
function RewardsHome({ transactions, user }) {
  return (
    <View>
      <ScrollView style={{ marginTop: 45 }}>
        <ProgressBarContainer>
          <Overline style={{ marginBottom: 15 }}>REWARD PROGRESS</Overline>
          <Title style={{ marginBottom: 15 }}>
            {parseInt(user.points) % 1000} / 1000
          </Title>
          <ProgressBar
            style={{ height: 20, borderRadius: 20, marginBottom: 15 }}
            progress={(parseInt(user.points) % 1000) / 1000}
            color={Colors.primaryGreen}
          />
          <Body style={{ marginBottom: 30 }}>
            Earn {`${1000 - (parseInt(user.points) % 1000)}`} points to unlock
            your next $5 reward
          </Body>
          <Overline style={{ marginBottom: 5 }}>
            AVAILIBLE REWARDS ({Math.floor(parseInt(user.points) / 1000)})
          </Overline>
        </ProgressBarContainer>

        {createPairs(Math.floor(parseInt(user.points) / 1000)).map(a => (
          <RewardCardContainer>
            <RewardTab></RewardTab>
            <RewardTab></RewardTab>
          </RewardCardContainer>
        ))}
        {createSingle(Math.floor(parseInt(user.points) / 1000)).map(a => (
          <RewardCardContainer>
            <RewardTab></RewardTab>
          </RewardCardContainer>
        ))}
      </ScrollView>
    </View>
  );
}

export default React.memo(RewardsHome);
