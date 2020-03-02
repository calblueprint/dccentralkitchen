import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { View } from 'react-native';
import Colors from '../../assets/Colors';
import { InLineContainer } from '../../styled/shared';
import {
  SpaceAroundRowContainer,
  SpaceBetweenRowContainer
} from '../../styled/shared';
import { StoreCardContainer, EBTStatusBar } from '../../styled/store';
import { Body, Caption, Title } from '../BaseComponents';
import StoreProductButton from './StoreProductButton';

/**
 * @prop
 * */

function StoreCard({ store, callBack, seeProduct }) {
  const { name, hours, address, distance, ebt } = store;
  return (
    <StoreCardContainer>
      <SpaceBetweenRowContainer>
        <SpaceAroundRowContainer>
          <Title color={Colors.activeText}>{name}</Title>
          {ebt && (
            <EBTStatusBar>
              <FontAwesome name="check" size={12} color="#004E14" />
              <Caption color={Colors.darkerGreen}> EBT</Caption>
            </EBTStatusBar>
          )}
        </SpaceAroundRowContainer>
        {seeProduct && <StoreProductButton callBack={callBack} />}
      </SpaceBetweenRowContainer>
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
    </StoreCardContainer>
  );
}

export default StoreCard;
