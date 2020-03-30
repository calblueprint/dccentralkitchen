import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { Alert, Clipboard, Dimensions, TouchableOpacity } from 'react-native';
import { showLocation } from 'react-native-map-link';
import Colors from '../../assets/Colors';
import { getMaxWidth } from '../../lib/mapUtils';
import {
  InLineContainer,
  RowContainer,
  SpaceBetweenRowContainer,
} from '../../styled/shared';
import {
  DividerBar,
  EBTStatusBar,
  StoreCardContainer,
  StoreDetailText,
} from '../../styled/store';
import { Caption, Title } from '../BaseComponents';
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
    <StoreCardContainer includeMargins>
      <SpaceBetweenRowContainer>
        <RowContainer>
          <Title
            color={Colors.activeText}
            style={{
              maxWidth: getMaxWidth(
                Dimensions.get('window').width,
                ebt,
                seeProduct
              ),
            }}
            numberOfLines={1}
            ellipsizeMode="tail">
            {name}
          </Title>
          {ebt && (
            <EBTStatusBar>
              <FontAwesome5 name="check" size={10} color={Colors.darkerGreen} />
              <Caption color={Colors.darkerGreen}> EBT</Caption>
            </EBTStatusBar>
          )}
        </RowContainer>
        {seeProduct && <StoreProductButton callBack={callBack} />}
      </SpaceBetweenRowContainer>
      <Caption style={{ marginBottom: 4 }} color={Colors.secondaryText}>
        {distance} miles away
      </Caption>
      <InLineContainer style={{ alignItems: 'center' }}>
        <FontAwesome5
          name="star"
          solid
          size={16}
          color={rewards ? Colors.primaryGreen : Colors.secondaryText}
        />
        <StoreDetailText greenText={rewards}>
          {rewards
            ? 'Earn and redeem Healthy Rewards here'
            : 'Healthy Rewards not accepted'}
        </StoreDetailText>
      </InLineContainer>
      <TouchableOpacity
        onPress={openDirections}
        onLongPress={writeAddressToClipboard}>
        <InLineContainer style={{ alignItems: 'center' }}>
          <FontAwesome5
            name="directions"
            size={16}
            color={Colors.secondaryText}
          />
          <StoreDetailText>{address}</StoreDetailText>
        </InLineContainer>
      </TouchableOpacity>
      <InLineContainer style={{ alignItems: 'center' }}>
        <FontAwesome5
          name="clock"
          solid
          size={16}
          color={Colors.secondaryText}
        />
        <StoreDetailText>{hours}</StoreDetailText>
      </InLineContainer>
      <DividerBar />
    </StoreCardContainer>
  );
}
