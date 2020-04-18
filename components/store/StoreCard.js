import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import React from 'react';
import { Alert, Clipboard, Dimensions, TouchableOpacity } from 'react-native';
import { showLocation } from 'react-native-map-link';
import { Chip } from 'react-native-paper';
import Colors from '../../constants/Colors';
import { computeStoreOpen, getMaxWidth } from '../../lib/mapUtils';
import {
  InLineContainer,
  RowContainer,
  SpaceBetweenRowContainer,
} from '../../styled/shared';
import {
  DividerBar,
  StoreCardContainer,
  StoreDetailText,
  styles,
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
    couponProgramPartner,
    wic,
    rewardsAccepted,
    latitude,
    longitude,
  } = store;

  const navigation = useNavigation();

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

  const storeOpenStatus = computeStoreOpen(storeHours);

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate('StoreDetailsScreen', {
          store,
          storeOpenStatus,
        })
      }>
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
          </RowContainer>
          {seeProduct && <StoreProductButton callBack={callBack} />}
        </SpaceBetweenRowContainer>
        {/* Accepted Program Tags */}
        <InLineContainer
          style={{ flexWrap: 'wrap', paddingTop: 6, paddingBottom: 6 }}>
          {snapOrEbtAccepted && (
            <Chip
              icon={() => (
                <FontAwesome5
                  name="credit-card"
                  size={10}
                  color={Colors.darkerGreen}
                  style={{ marginTop: -12 }}
                />
              )}
              textStyle={styles.chipText}
              style={styles.chip}>
              <Caption color={Colors.darkerGreen}>EBT</Caption>
            </Chip>
          )}
          {wic && (
            <Chip
              icon={() => (
                <FontAwesome5
                  name="heart"
                  solid
                  size={10}
                  color={Colors.darkerGreen}
                  style={{ marginTop: -12 }}
                />
              )}
              textStyle={styles.chipText}
              style={styles.chip}>
              <Caption color={Colors.darkerGreen}>WIC</Caption>
            </Chip>
          )}
          {couponProgramPartner && (
            <Chip
              icon={() => (
                <FontAwesome5
                  name="carrot"
                  size={10}
                  color={Colors.darkerGreen}
                  style={{ marginTop: -12 }}
                />
              )}
              textStyle={styles.chipText}
              style={styles.chip}>
              <Caption color={Colors.darkerGreen}>SNAP Match</Caption>
            </Chip>
          )}
          {rewardsAccepted && (
            <Chip
              icon={() => (
                <FontAwesome5
                  name="star"
                  solid
                  size={10}
                  color={Colors.darkerGreen}
                  style={{ marginTop: -12 }}
                />
              )}
              textStyle={styles.chipText}
              style={styles.chip}>
              <Caption color={Colors.darkerGreen}>Healthy Rewards</Caption>
            </Chip>
          )}
        </InLineContainer>
        {seeDistance && (
          <Caption
            style={{ marginBottom: 4, marginTop: 6 }}
            color={Colors.secondaryText}>
            {`${distance} miles away`}
          </Caption>
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
          {storeOpenStatus.includes('Open') ? (
            <StoreDetailText greenText={storeOpenStatus}>
              {storeOpenStatus}
            </StoreDetailText>
          ) : (
            <StoreDetailText>{storeOpenStatus}</StoreDetailText>
          )}
        </InLineContainer>
        <DividerBar />
      </StoreCardContainer>
    </TouchableOpacity>
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
