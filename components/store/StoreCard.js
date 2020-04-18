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

/**
 * @prop
 * */

export default function StoreCard({ store, storeList, seeDistance }) {
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
      disabled={!storeList}
      onPress={() =>
        navigation.navigate('Stores', {
          currentStore: store,
        })
      }>
      <StoreCardContainer includeMargins>
        <SpaceBetweenRowContainer>
          <RowContainer>
            {storeList ? (
              <Subhead
                style={{
                  maxWidth: getMaxWidth(Dimensions.get('window').width),
                }}
                numberOfLines={1}
                ellipsizeMode="tail">
                {storeName}
              </Subhead>
            ) : (
              <Title
                style={{
                  maxWidth: getMaxWidth(Dimensions.get('window').width),
                }}
                numberOfLines={1}
                ellipsizeMode="tail">
                {storeName}
              </Title>
            )}
          </RowContainer>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('StoreDetailsScreen', {
                store,
                storeOpenStatus,
              })
            }
            style={{ paddingLeft: 10, paddingBottom: 10 }}>
            <FontAwesome5
              name="info-circle"
              solid
              size={30}
              color={Colors.primaryOrange}
            />
          </TouchableOpacity>
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
          disabled={storeList}
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
  storeList: PropTypes.bool,
  seeDistance: PropTypes.bool.isRequired,
};

StoreCard.defaultProps = {
  store: null,
  callBack: null,
  storeList: false,
};
