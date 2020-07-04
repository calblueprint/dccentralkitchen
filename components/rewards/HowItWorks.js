import PropTypes from 'prop-types';
import React from 'react';
import { Image, ScrollView, View } from 'react-native';
import { rewardDollarValue, rewardPointValue } from '../../constants/Rewards';
import { ColumnContainer, RowContainer } from '../../styled/shared';
import { Subtitle, Title } from '../BaseComponents';
import RewardsFAQ from './RewardsFAQ';
/**
 * @prop
 * */

function HowItWorks(props) {
  return (
    <ScrollView style={{ display: 'flex', marginLeft: 16, paddingRight: 16 }}>
      <View style={{ display: 'flex', maxHeight: 1750, paddingTop: 24 }}>
        <RowContainer
          style={{ width: '100%', alignItems: 'center', marginBottom: 12 }}>
          <Image
            source={require('../../assets/images/1Shop.png')}
            style={{
              maxWidth: '40%',
              resizeMode: 'contain',
              maxHeight: 150,
              marginRight: 12,
            }}
          />
          <ColumnContainer style={{ flex: 1 }}>
            <Title>Shop</Title>
            <Subtitle>
              Buy Healthy Corners products at participating stores
            </Subtitle>
          </ColumnContainer>
        </RowContainer>
        <RowContainer
          style={{ width: '100%', alignItems: 'center', marginBottom: 12 }}>
          <Image
            source={require('../../assets/images/2Earn.png')}
            style={{
              maxWidth: '40%',
              resizeMode: 'contain',
              maxHeight: 150,
              marginRight: 12,
            }}
          />
          <ColumnContainer style={{ flex: 1 }}>
            <Title>Earn</Title>
            <Subtitle>
              Give your phone number before you pay at a store to earn 100
              points for every $1 spent on Healthy Corners products
            </Subtitle>
          </ColumnContainer>
        </RowContainer>

        <RowContainer
          style={{ width: '100%', alignItems: 'center', marginBottom: 12 }}>
          <Image
            source={require('../../assets/images/3Save.png')}
            style={{
              maxWidth: '40%',
              resizeMode: 'contain',
              maxHeight: 150,
              marginRight: 12,
            }}
          />
          <ColumnContainer style={{ flex: 1 }}>
            <Title>Save</Title>
            <Subtitle>
              {`Unlock a $${rewardDollarValue} FREE produce reward each time you reach ${rewardPointValue} points`}
            </Subtitle>
          </ColumnContainer>
        </RowContainer>
        {props.isGuest || <RewardsFAQ />}
      </View>
    </ScrollView>
  );
}

export default React.memo(HowItWorks);

HowItWorks.propTypes = {
  isGuest: PropTypes.bool,
};

HowItWorks.defaultProps = {
  isGuest: false,
};
