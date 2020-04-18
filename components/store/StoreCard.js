import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import React from 'react';
import { Dimensions, TouchableOpacity } from 'react-native';
import { Chip } from 'react-native-paper';
import Colors from '../../constants/Colors';
import { formatPhoneNumber } from '../../lib/authUtils';
import {
  computeStoreOpen,
  getMaxWidth,
  openDirections,
  writeToClipboard,
} from '../../lib/mapUtils';
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
    phoneNumber,
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
                  size={13}
                  color={Colors.darkerGreen}
                />
              )}
              style={styles.chip}>
              EBT
            </Chip>
          )}
          {wic && (
            <Chip
              icon={() => (
                <FontAwesome5
                  name="heart"
                  size={13}
                  color={Colors.darkerGreen}
                />
              )}
              style={styles.chip}>
              WIC
            </Chip>
          )}
          {couponProgramPartner && (
            <Chip
              icon={() => (
                <FontAwesome5
                  name="carrot"
                  size={13}
                  color={Colors.darkerGreen}
                />
              )}
              style={styles.chip}>
              SNAP Match
            </Chip>
          )}
          {rewardsAccepted && (
            <Chip
              icon={() => (
                <FontAwesome5
                  name="star"
                  size={13}
                  color={Colors.darkerGreen}
                />
              )}
              style={styles.chip}>
              Healthy Rewards
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
          onPress={() => openDirections(latitude, longitude, storeName)}
          onLongPress={() => writeToClipboard(address)}>
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
            name="phone"
            solid
            size={16}
            color={Colors.secondaryText}
          />
          <StoreDetailText>
            {phoneNumber
              ? formatPhoneNumber(phoneNumber)
              : 'Phone number unavailable'}
          </StoreDetailText>
        </InLineContainer>
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
