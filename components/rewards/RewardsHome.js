import React from 'react';
import { ScrollView, View } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import Colors from '../../assets/Colors';
import {
  AvailiableRewardsContainer,
  RewardsProgressContainer
} from '../../styled/rewards';
import { Body, Overline, Title } from '../BaseComponents';
import RewardsCard from './RewardsCard';

/**
 * @prop
 * */

function createList(n) {
  const list = [];
  for (let i = 1; i <= n; i += 1) {
    list.push(i);
  }
  return list;
}

function RewardsHome({ customer }) {
  return (
    <View>
      <ScrollView>
        <RewardsProgressContainer>
          <Overline style={{ marginTop: 24, marginBottom: 15 }}>
            Reward Progress
          </Overline>
          <Title style={{ marginBottom: 2 }}>
            {parseInt(customer.points) % 1000} / 1000
          </Title>
          <ProgressBar
            style={{ height: 20, borderRadius: 20, marginBottom: 15 }}
            progress={(parseInt(customer.points) % 1000) / 1000}
            color={Colors.primaryGreen}
          />
          <Body style={{ marginBottom: 28 }}>
            Earn {`${1000 - (parseInt(customer.points) % 1000)}`} points to
            unlock your next $5 reward
          </Body>
          <Overline style={{ marginBottom: 8 }}>
            Available Rewards ({Math.floor(parseInt(customer.points) / 1000)})
          </Overline>
        </RewardsProgressContainer>
        <AvailiableRewardsContainer>
          {createList(Math.floor(parseInt(customer.points) / 1000)).map(i => (
            <RewardsCard key={i} />
          ))}
        </AvailiableRewardsContainer>
      </ScrollView>
    </View>
  );
}

export default React.memo(RewardsHome);
