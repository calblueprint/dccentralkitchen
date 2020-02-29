import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';
import Colors from '../../assets/Colors';
import { InLineContainer } from '../../styled/shared';
import { ViewProductsContainer } from '../../styled/store';
import { Body, ButtonContainer, Caption, Title } from '../BaseComponents';
import StoreProductButton from './StoreProductButton';

/**
 * @prop
 * */

function StoreCard({ store, callBack, seeProduct }) {
  const { name, hours, address, distance, ebt } = store;
  return (
    <View style={{ marginBottom: 10 }}>
      <ButtonContainer onPress={callBack}>
        <ViewProductsContainer>
          <Title color={Colors.activeText}>{name}</Title>
          {seeProduct && <StoreProductButton callBack={callBack} />}
        </ViewProductsContainer>
        <Caption color={Colors.secondaryText}>Distance: {distance} mi </Caption>
        <InLineContainer>
          <MaterialCommunityIcons name="directions" size={16} />
          <Body color={Colors.secondaryText}>{address}</Body>
        </InLineContainer>
        <InLineContainer>
          <FontAwesome name="clock-o" size={12} />
          <Body color={Colors.secondaryText}>{hours}</Body>
        </InLineContainer>

        {/* Temporary EBT status; TODO @tommypoa to replace with tag */}
        <Body color={Colors.secondaryText}>
          EBT:{' '}
          {ebt ? (
            <Body color={Colors.secondaryText}>Yes</Body>
          ) : (
            <Body color={Colors.secondaryText}>No</Body>
          )}
        </Body>
      </ButtonContainer>
    </View>
  );
}

export default StoreCard;
