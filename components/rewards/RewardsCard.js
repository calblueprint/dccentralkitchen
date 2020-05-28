import React from 'react';
import Colors from '../../constants/Colors';
import { rewardDollarValue, rewardPointValue } from '../../constants/Rewards';
import {
  RewardDescriptionContainer,
  RewardsCardContainer,
} from '../../styled/rewards';
import { Caption, Subtitle } from '../BaseComponents';
import CircleIcon from '../CircleIcon';

function RewardsCard() {
  return (
    <RewardsCardContainer>
      <CircleIcon
        icon="star"
        iconColor={Colors.primaryGreen}
        circleColor={Colors.lightText}
      />
      <RewardDescriptionContainer>
        <Subtitle color={Colors.darkerGreen}>
          {`$${rewardDollarValue} Reward`}
        </Subtitle>
        <Caption color={Colors.darkerGreen}>
          {`${rewardPointValue} points`}
        </Caption>
      </RewardDescriptionContainer>
    </RewardsCardContainer>
  );
}

export default RewardsCard;
