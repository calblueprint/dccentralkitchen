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
    <ScrollView style={{ display: 'flex' }}>
      <View
        style={{
          display: 'flex',
          marginLeft: 16,
          paddingRight: 16,
          paddingTop: 24,
        }}>
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
              Simply purchase Healthy Corners products at participating stores
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
              {`Earn 100 points for every dollar you spend on our products!\n$1=100 points`}
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
              {`Unlock a $${rewardDollarValue} reward for FREE Healthy Corners products every time you reach ${rewardPointValue} points. \n$5 spent = $5 saved!`}
            </Subtitle>
          </ColumnContainer>
        </RowContainer>
      </View>
      {props.isGuest || <RewardsFAQ />}
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
