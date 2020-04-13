import { FontAwesome5 } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import React from 'react';
import { Alert, Clipboard, Dimensions, TouchableOpacity } from 'react-native';
import { showLocation } from 'react-native-map-link';
import Colors from '../../constants/Colors';
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
import { Caption, Subhead, Title } from '../BaseComponents';
import StoreProductButton from './StoreProductButton';

/**
 * @prop
 * */

export default function StoreCard({
  store,
  callBack,
  seeProduct,
  seeDistance,
}) {
  const {
    storeName,
    storeHours,
    address,
    distance,
    snapOrEbtAccepted,
    rewardsAccepted,
    latitude,
    longitude,
  } = store;

  const writeAddressToClipboard = () => {
    Clipboard.setString(address);
    Alert.alert('Copied to Clipboard!', address);
  };

  const openDirections = () => {
    showLocation({
      latitude,
      longitude,
      title: storeName,
      googlePlaceId: 'ChIJW-T2Wt7Gt4kRKl2I1CJFUsI',
      alwaysIncludeGoogle: true,
    });
  };

  return (
    <StoreCardContainer includeMargins>
      <SpaceBetweenRowContainer>
        <RowContainer>
          {seeProduct ? (
            <Subhead
              style={{
                marginTop: 2,
                maxWidth: getMaxWidth(
                  Dimensions.get('window').width,
                  snapOrEbtAccepted,
                  seeProduct
                ),
              }}
              numberOfLines={1}
              ellipsizeMode="tail">
              {storeName}
            </Subhead>
          ) : (
            <Title
              style={{
                maxWidth: getMaxWidth(
                  Dimensions.get('window').width,
                  snapOrEbtAccepted,
                  seeProduct
                ),
              }}
              numberOfLines={1}
              ellipsizeMode="tail">
              {storeName}
            </Title>
          )}
          {snapOrEbtAccepted && (
            <EBTStatusBar>
              <FontAwesome5 name="check" size={10} color={Colors.darkerGreen} />
              <Caption color={Colors.darkerGreen}> EBT</Caption>
            </EBTStatusBar>
          )}
        </RowContainer>
        {seeProduct && <StoreProductButton callBack={callBack} />}
      </SpaceBetweenRowContainer>
      {seeDistance && (
        <Caption style={{ marginBottom: 4 }} color={Colors.secondaryText}>
          {`${distance} miles away`}
        </Caption>
      )}

      <InLineContainer style={{ alignItems: 'center' }}>
        <FontAwesome5
          name="star"
          solid
          size={16}
          color={rewardsAccepted ? Colors.primaryGreen : Colors.secondaryText}
        />
        <StoreDetailText greenText={rewardsAccepted}>
          {rewardsAccepted
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
        <StoreDetailText>{storeHours}</StoreDetailText>
      </InLineContainer>
      <DividerBar />
    </StoreCardContainer>
  );
}

StoreCard.propTypes = {
  store: PropTypes.object,
  callBack: PropTypes.func,
  seeProduct: PropTypes.bool.isRequired,
  seeDistance: PropTypes.bool.isRequired,
};

StoreCard.defaultProps = {
  store: null,
  callBack: null,
};
