import React from 'react';
import {
  Card,
  ContentContainer,
  ContentText,
  ContentText2,
  StarIcon
} from '../../styled/rewards';
import { Subhead, Caption } from '../BaseComponents';
import { FontAwesome5 } from '@expo/vector-icons';
import Colors from '../../assets/Colors';

class RewardCard extends React.Component {
  render() {
    return (
      <Card>
        <StarIcon>
          <FontAwesome5
            name="star"
            solid
            size={24}
            color={Colors.primaryrGreen}
          />
        </StarIcon>
        <ContentContainer>
          <Subhead>$5 reward</Subhead>
          <Caption>1000 points</Caption>
        </ContentContainer>
      </Card>
    );
  }
}

export default RewardCard;
