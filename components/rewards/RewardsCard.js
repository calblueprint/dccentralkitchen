import React from 'react';
import {
  Card,
  ContentContainer,
  ContentText,
  ContentText2,
  StarIcon
} from '../../styled/rewards';
import { FontAwesome5 } from '@expo/vector-icons';
import Colors from '../../assets/Colors';

class RewardCard extends React.Component {
  render() {
    return (
      <Card>
        <StarIcon>
          <FontAwesome5 name="star" size={24} color={Colors.darkerGreen} />
        </StarIcon>
        <ContentContainer>
          <ContentText>$5 reward</ContentText>
          <ContentText2>1000 points</ContentText2>
        </ContentContainer>
      </Card>
    );
  }
}

export default RewardCard;
