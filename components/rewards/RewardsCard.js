import React from 'react';
import Colors from '../../constants/Colors';
import {
  RewardDescriptionContainer,
  RewardsCardContainer,
} from '../../styled/rewards';
import { Caption, Subhead } from '../BaseComponents';
import CircleIcon from '../CircleIcon';

class RewardsCard extends React.Component {
  render() {
    return (
      <RewardsCardContainer>
        <CircleIcon
          icon="star"
          iconColor={Colors.primaryGreen}
          circleColor={Colors.lightest}
        />
        <RewardDescriptionContainer>
          <Subhead color={Colors.darkerGreen}>$5 Reward</Subhead>
          <Caption color={Colors.darkerGreen}>1000 points</Caption>
        </RewardDescriptionContainer>
      </RewardsCardContainer>
    );
  }
}

export default RewardsCard;
