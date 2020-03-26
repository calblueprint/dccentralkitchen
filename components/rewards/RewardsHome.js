import React from 'react';
import { ScrollView } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import Colors from '../../assets/Colors';
import {
  AvailableRewardsContainer,
  RewardsProgressContainer
} from '../../styled/rewards';
import { Body, Overline, Title } from '../BaseComponents';
import RewardsCard from './RewardsCard';

/**
 * @prop
 * */

function createList(N) {
  let list = [];
  for (var i = 1; i <= N; i++) {
    list.push(i);
  }
  return list;
}

function RewardsHome({ user }) {
  return (
    <ScrollView style={{ marginLeft: 16, paddingRight: 16 }}>
      <RewardsProgressContainer>
        <Overline style={{ marginTop: 24, marginBottom: 12 }}>
          Reward Progress
        </Overline>
        <Title style={{ marginBottom: 2 }}>
          {parseInt(user.points) % 1000} / 1000
        </Title>
        <ProgressBar
          style={{
            height: 20,
            width: '100%',
            borderRadius: 20,
            marginBottom: 15
          }}
          progress={(parseInt(user.points) % 1000) / 1000}
          color={Colors.primaryGreen}
        />
        <Body style={{ marginBottom: 28 }}>
          Earn {`${1000 - (parseInt(user.points) % 1000)}`} points to unlock
          your next $5 reward
        </Body>
        <Overline style={{ marginBottom: 8 }}>
          Available Rewards ({Math.floor(parseInt(user.points) / 1000)})
        </Overline>
      </RewardsProgressContainer>
      <AvailableRewardsContainer>
        {createList(Math.floor(parseInt(user.points) / 1000)).map(a => (
          <RewardsCard></RewardsCard>
        ))}
      </AvailableRewardsContainer>
    </ScrollView>
  );
}

export default React.memo(RewardsHome);
