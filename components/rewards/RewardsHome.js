import { FontAwesome5 } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import React from 'react';
import { FlatList, PixelRatio, View } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import Colors from '../../constants/Colors';
import Window from '../../constants/Layout';
import { rewardDollarValue, rewardPointValue } from '../../constants/Rewards';
import { displayDollarValue } from '../../lib/common';
import { RewardsProgressContainer } from '../../styled/rewards';
import { Body, Overline, Title } from '../BaseComponents';
import ParticipatingStores from './ParticipatingStores';
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

function RewardsHome({ customer, participating }) {
  const rewardsAvailable = parseInt(customer.points, 10) / rewardPointValue;
  const pointsToNext = parseInt(customer.points, 10) % rewardPointValue;
  return (
    <View style={{ marginLeft: 16 }}>
      <FlatList
        style={{ paddingRight: 16 }}
        data={createList(Math.floor(rewardsAvailable))}
        renderItem={() => <RewardsCard />}
        keyExtractor={(item, index) => index.toString()}
        numColumns={
          Window.width > 370 && PixelRatio.getFontScale() < 1.2 ? 2 : 1
        }
        // Rewards Progress section
        ListHeaderComponent={
          <RewardsProgressContainer>
            <Overline style={{ marginTop: 24, marginBottom: 12 }}>
              Reward Progress
            </Overline>
            <Title style={{ marginBottom: 2 }}>
              {`${pointsToNext || 0} / ${rewardPointValue}`}
            </Title>
            <ProgressBar
              style={{
                height: 20,
                width: '100%',
                borderRadius: 20,
                marginBottom: 15,
              }}
              progress={pointsToNext / rewardPointValue}
              color={Colors.primaryGreen}
            />
            <Body style={{ marginBottom: 28 }}>
              {`Buy ${displayDollarValue(
                (rewardPointValue - pointsToNext) / 100
              )} of healthy food to earn ${rewardPointValue -
                pointsToNext} points and unlock your next $${rewardDollarValue} reward`}
            </Body>
            <Overline style={{ marginBottom: 8 }}>
              {`Available Rewards (${Math.floor(rewardsAvailable)})`}
            </Overline>
          </RewardsProgressContainer>
        }
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
              color={Colors.primaryGray}
              style={{ marginBottom: 12 }}
            />
            <Body color={Colors.secondaryText}>No available rewards.</Body>
            <Body color={Colors.secondaryText} style={{ textAlign: 'center' }}>
              Buy healthy produce at participating stores to earn points and
              unlock rewards!
            </Body>
          </View>
        }
        // Participating Stores section
        ListFooterComponent={
          <ParticipatingStores participating={participating} guest={false} />
        }
      />
    </View>
  );
}

RewardsHome.propTypes = {
  customer: PropTypes.object.isRequired,
  participating: PropTypes.array.isRequired,
};

export default React.memo(RewardsHome);
