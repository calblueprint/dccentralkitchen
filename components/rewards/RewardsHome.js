import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { FlatList, ScrollView, View } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import Colors from '../../constants/Colors';
import {
  AvailableRewardsContainer,
  RewardsProgressContainer,
} from '../../styled/rewards';
import { Body, Overline, Title } from '../BaseComponents';
import RewardsCard from './RewardsCard';

/**
 * @prop
 * */

function createList(N) {
  const list = [];
  for (let i = 1; i <= N; i++) {
    list.push(i);
  }
  return list;
}

function RewardsHome({ user, isGuest }) {
  let phrase =
    'Buy healthy produce at participating stores to earn points and unlock rewards!';
  if (isGuest) {
    phrase = 'Sign up for account to start earning points and rewards today!';
  }
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
            marginBottom: 15,
          }}
          progress={(parseInt(user.points) % 1000) / 1000}
          color={Colors.primaryGreen}
        />
        <Body style={{ marginBottom: 28 }}>
          Earn {`${1000 - (parseInt(user.points) % 1000)}`} points to unlock
          your next $5 reward.
        </Body>
        <Overline style={{ marginBottom: 8 }}>
          Available Rewards ({Math.floor(parseInt(user.points) / 1000)})
        </Overline>
      </RewardsProgressContainer>
      <AvailableRewardsContainer>
        <FlatList
          data={createList(Math.floor(parseInt(user.points) / 1000))}
          renderItem={() => <RewardsCard />}
          keyExtractor={(item, index) => index.toString()}
          numColumns={2}
          ListEmptyComponent={
            <View
              style={{
                alignItems: 'center',
                marginTop: 20,
                paddingLeft: 32,
                paddingRight: 32,
              }}>
              <FontAwesome5
                name="star"
                size={64}
                solid
                color={Colors.base}
                style={{ marginBottom: 12 }}
              />
              <Body color={Colors.secondaryText}>No available rewards.</Body>
              <Body
                color={Colors.secondaryText}
                style={{ textAlign: 'center' }}>
                Buy healthy produce at participating stores to earn points and
                unlock rewards!
              </Body>
            </View>
          }
        />
      </AvailableRewardsContainer>
    </ScrollView>
  );
}

export default React.memo(RewardsHome);
