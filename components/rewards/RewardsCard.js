import React from 'react';
import {
  RewardsCardContainer,
  RewardDescriptionContainer,
  StarIcon
} from '../../styled/rewards';
import { Subhead, Caption } from '../BaseComponents';
import { FontAwesome5 } from '@expo/vector-icons';
import Colors from '../../assets/Colors';

class RewardsCard extends React.Component {
  render() {
    return (
      <RewardsCardContainer>
        <StarIcon>
          <FontAwesome5
            name="star"
            solid
            size={24}
            color={Colors.primaryGreen}
          />
        </StarIcon>
        <RewardDescriptionContainer>
          <Subhead color={Colors.darkerGreen}>$5 Reward</Subhead>
          <Caption color={Colors.darkerGreen}>1000 points</Caption>
        </RewardDescriptionContainer>
      </RewardsCardContainer>
    );
  }
}

export default RewardsCard;
