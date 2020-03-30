import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { Alert, Clipboard, TouchableOpacity } from 'react-native';
import { showLocation } from 'react-native-map-link';
import Colors from '../../constants/Colors';
import {
  InLineContainer,
  SpaceAroundRowContainer,
  SpaceBetweenRowContainer,
} from '../../styled/shared';
import {
  DividerBar,
  EBTStatusBar,
  StoreCardContainer,
} from '../../styled/store';
import { Body, Caption, Title } from '../BaseComponents';
import StoreProductButton from './StoreProductButton';

/**
 * @prop
 * */

export default function StoreCard({ store, callBack, seeProduct }) {
  const { name, hours, address, distance, ebt, rewards, lat, long } = store;

  const writeAddressToClipboard = () => {
    Clipboard.setString(address);
    Alert.alert('Copied to Clipboard!', address);
  };

  const openDirections = () => {
    showLocation({
      latitude: lat,
      longitude: long,
      title: name,
      googlePlaceId: 'ChIJW-T2Wt7Gt4kRKl2I1CJFUsI',
      alwaysIncludeGoogle: true,
    });
  };

  return (
    <StoreCardContainer>
      <SpaceBetweenRowContainer>
        <SpaceAroundRowContainer>
          <Title color={Colors.activeText}>{name}</Title>
          {ebt && (
            <EBTStatusBar>
              <FontAwesome5 name="check" size={10} color={Colors.darkerGreen} />
              <Caption color={Colors.darkerGreen}> EBT</Caption>
            </EBTStatusBar>
          )}
        </SpaceAroundRowContainer>
        {seeProduct && <StoreProductButton callBack={callBack} />}
      </SpaceBetweenRowContainer>
      <Caption style={{ marginBottom: 4 }} color={Colors.secondaryText}>
        {distance} miles away
      </Caption>
      {rewards && (
        <InLineContainer style={{ alignItems: 'center' }}>
          <FontAwesome5
            name="star"
            solid
            size={16}
            color={Colors.primaryGreen}
          />
          <Body color={Colors.primaryGreen}>
            Earn and redeem Healthy Rewards here
          </Body>
        </InLineContainer>
      )}
      <TouchableOpacity
        onPress={openDirections}
        onLongPress={writeAddressToClipboard}>
        <InLineContainer style={{ alignItems: 'center' }}>
          <FontAwesome5
            name="directions"
            size={16}
            color={Colors.secondaryText}
          />
          <Body color={Colors.secondaryText}> {address}</Body>
        </InLineContainer>
      </TouchableOpacity>
      <InLineContainer style={{ alignItems: 'center' }}>
        <FontAwesome5
          name="clock"
          solid
          size={16}
          color={Colors.secondaryText}
        />
        <Body color={Colors.secondaryText}> {hours}</Body>
      </InLineContainer>
      <DividerBar />
    </StoreCardContainer>
  );
}
