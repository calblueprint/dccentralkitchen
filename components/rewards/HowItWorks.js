import React from 'react';
import { Image, ScrollView, View } from 'react-native';
import { rewardDollarValue, rewardPointValue } from '../../constants/Rewards';
import { BigTitle, Title } from '../BaseComponents';

/**
 * @prop
 * */

function HowItWorks() {
  return (
    <ScrollView style={{ display: 'flex', marginLeft: 16, paddingRight: 16 }}>
      <View style={{ display: 'flex', alignItems: 'center', maxHeight: 1750 }}>
        <Image
          source={require('../../assets/images/1Shop.png')}
          style={{
            maxWidth: '100%',
            resizeMode: 'contain',
            maxHeight: 400,
          }}
        />
        <BigTitle>Shop</BigTitle>
        <Title style={{ textAlign: 'center' }}>
          Buy Healthy Corners products at participating stores!
        </Title>

        <Image
          source={require('../../assets/images/2Earn.png')}
          style={{
            maxWidth: '100%',
            resizeMode: 'contain',
            maxHeight: 400,
          }}
        />
        <BigTitle>Earn</BigTitle>
        <Title style={{ textAlign: 'center' }}>
          {`Every dollar you spend on healthy products earns you points!\n $1 = 100 points`}
        </Title>

        <Image
          source={require('../../assets/images/3Save.png')}
          style={{
            maxWidth: '100%',
            resizeMode: 'contain',
            maxHeight: 400,
          }}
        />
        <BigTitle>Save</BigTitle>
        <Title style={{ textAlign: 'center' }}>
          {`Every ${rewardPointValue} points you earn unlocks a $${rewardDollarValue} reward!\n\nRedeem on Healthy Corners products at participating stores!`}
        </Title>
      </View>
    </ScrollView>
  );
}

export default React.memo(HowItWorks);
