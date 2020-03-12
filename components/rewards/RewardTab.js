import React from 'react';
import {
  RewardTabContainer,
  RewardDescriptionContainer,
  StarIcon
} from '../../styled/rewards';
import { Subhead, Caption } from '../BaseComponents';
import { FontAwesome5 } from '@expo/vector-icons';
import Colors from '../../assets/Colors';

class RewardTab extends React.Component {
  render() {
    return (
      <RewardTabContainer>
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
          <Caption color={Colors.primaryGreen}>1000 points</Caption>
        </RewardDescriptionContainer>
      </RewardTabContainer>
    );
  }
}

export default RewardTab;
