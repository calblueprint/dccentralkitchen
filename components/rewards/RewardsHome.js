import React from 'react';
import { View, ScrollView } from 'react-native';
import { Body, Overline, Title } from '../BaseComponents';
import {
  RewardsProgressContainer,
  AvailiableRewardsContainer
} from '../../styled/rewards';
import { ProgressBar } from 'react-native-paper';
import RewardsCard from './RewardsCard';
import Colors from '../../assets/Colors';

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
    <View>
      <ScrollView style={{ marginTop: 24 }}>
        <RewardsProgressContainer>
          <Overline style={{ marginBottom: 15 }}>REWARD PROGRESS</Overline>
          <Title style={{ marginBottom: 15 }}>
            {parseInt(user.points) % 1000} / 1000
          </Title>
          <ProgressBar
            style={{ height: 20, borderRadius: 20, marginBottom: 15 }}
            progress={(parseInt(user.points) % 1000) / 1000}
            color={Colors.primaryGreen}
          />
          <Body style={{ marginBottom: 28 }}>
            Earn {`${1000 - (parseInt(user.points) % 1000)}`} points to unlock
            your next $5 reward
          </Body>
          <Overline style={{ marginBottom: 5 }}>
            AVAILIABLE REWARDS ({Math.floor(parseInt(user.points) / 1000)})
          </Overline>
        </RewardsProgressContainer>
        <AvailiableRewardsContainer>
          {createList(Math.floor(parseInt(user.points) / 1000)).map(a => (
            <RewardsCard></RewardsCard>
          ))}
        </AvailiableRewardsContainer>
      </ScrollView>
    </View>
  );
}

export default React.memo(RewardsHome);
