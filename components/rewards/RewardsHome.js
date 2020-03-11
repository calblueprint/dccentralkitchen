import React from 'react';
import { View } from 'react-native';
import { Body, Caption, Title } from '../BaseComponents';
import { styles } from '../../styled/rewards';
import { ProgressBar } from '../rewards/ProgressBar';

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
      <ScrollView style={{ marginTop: 45 }}>
        <WaluigiContainer>
          <Overline>REWARD PROGRESS</Overline>
          <Text style={{ fontSize: 10 }}> </Text>
          <Text
            style={{
              fontSize: 30
            }}>
            {parseInt(user.points) % 1000} / 1000
          </Text>
          <Text style={{ fontSize: 3 }}> </Text>
          <ProgressBar
            style={{
              flex: 0.8,
              height: 20,
              borderRadius: 20
            }}
            progress={(parseInt(user.points) % 1000) / 1000}
            color={Colors.primaryGreen}
          />
          <Text style={{ fontSize: 3 }}> </Text>
          <Body>
            Earn{' '}
            {`${1000 -
              (parseInt(user.points) %
                1000)} points to unlock your next $5 reward`}{' '}
          </Body>
          <Body> </Body>
          <Overline>
            AVAILIBLE REWARDS ({Math.floor(parseInt(user.points) / 1000)})
          </Overline>
        </WaluigiContainer>
        {createList(Math.floor(parseInt(user.points) / 1000)).map(a => (
          <RewardsCard></RewardsCard>
        ))}
        <ContentContainer>
          <RewardsCard></RewardsCard>
          <RewardsCard></RewardsCard>
        </ContentContainer>
      </ScrollView>
    </View>
  );
}

export default React.memo(RewardsHome);
