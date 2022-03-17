import React from 'react';
import { Image, ScrollView, View } from 'react-native';
import { HowItWorksContainer } from '../../styled/rewards';
import { ColumnContainer } from '../../styled/shared';
import { Subtitle, Title } from '../BaseComponents';
import RewardsFAQ from './RewardsFAQ';
/**
 * @prop
 * */

function HowAppWorks() {
  return (
    <ScrollView style={{ display: 'flex' }}>
      <View
        style={{
          display: 'flex',
          marginLeft: 16,
          paddingRight: 16,
          paddingTop: 24,
        }}>
        <HowItWorksContainer>
          <Image
            source={require('../../assets/images/Onboarding_2.png')}
            style={{
              maxWidth: '40%',
              resizeMode: 'contain',
              height: 140,
              marginRight: 12,
            }}
          />
          <ColumnContainer style={{ flex: 1 }}>
            <Title>Find Stores Near You</Title>
            <Subtitle>
              Explore the map to discover nearby stores stocking healthy fruits
              and vegetables
            </Subtitle>
          </ColumnContainer>
        </HowItWorksContainer>

        <HowItWorksContainer>
          <Image
            source={require('../../assets/images/Onboarding_3.png')}
            style={{
              maxWidth: '40%',
              resizeMode: 'contain',
              height: 140,
              marginRight: 12,
            }}
          />
          <ColumnContainer style={{ flex: 1 }}>
            <Title>Know What&apos;s In Stock</Title>
            <Subtitle>
              See what products are available when you leave the house
            </Subtitle>
          </ColumnContainer>
        </HowItWorksContainer>

        <HowItWorksContainer>
          <Image
            source={require('../../assets/images/Onboarding_5.png')}
            style={{
              maxWidth: '40%',
              resizeMode: 'contain',
              height: 140,
              marginRight: 12,
            }}
          />
          <ColumnContainer style={{ flex: 1 }}>
            <Title>Stay Informed</Title>
            <Subtitle>
              Access our resource database to help you continue eating and
              living healthy.
            </Subtitle>
          </ColumnContainer>
        </HowItWorksContainer>
      </View>

      <RewardsFAQ />
    </ScrollView>
  );
}

export default React.memo(HowAppWorks);
