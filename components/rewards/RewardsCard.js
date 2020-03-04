import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Card, ContentContainer, ContentText } from '../../styled/rewards';

class RewardsCard extends React.Component {
  render() {
    return (
      <TouchableOpacity>
        <Card>
          <ContentContainer>
            <ContentText>$5 Reward</ContentText>
          </ContentContainer>
        </Card>
      </TouchableOpacity>
    );
  }
}

export default RewardsCard;
