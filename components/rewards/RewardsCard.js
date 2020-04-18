import React from 'react';
import Colors from '../../constants/Colors';
import { rewardDollarValue, rewardPointValue } from '../../constants/Rewards';
import {
  RewardDescriptionContainer,
  RewardsCardContainer,
} from '../../styled/rewards';
import { Caption, Subhead } from '../BaseComponents';
import CircleIcon from '../CircleIcon';

function RewardsCard() {
  return (
    <RewardsCardContainer>
      <CircleIcon
        icon="star"
        iconColor={Colors.primaryGreen}
        circleColor={Colors.lightest}
      />
      <RewardDescriptionContainer>
        <Subhead color={Colors.darkerGreen}>
          {`$${rewardDollarValue} Reward`}
        </Subhead>
        <Caption color={Colors.darkerGreen}>
          {`${rewardPointValue} points`}
        </Caption>
      </RewardDescriptionContainer>
    </RewardsCardContainer>
  );
}

export default RewardsCard;
