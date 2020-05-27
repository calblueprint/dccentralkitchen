import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import React from 'react';
import { Dimensions, Linking, TouchableOpacity } from 'react-native';
import Colors from '../../constants/Colors';
import {
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
} from '../../styled/store';
import { Caption, Title } from '../BaseComponents';
import ProgramTag from './ProgramTag';

/**
 * @prop
 * */

export default function StoreCard({ store, storeList, seeDistance }) {
  const {
    storeName,
    storeOpenStatus,
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
            <Title
              style={{
                maxWidth: getMaxWidth(Dimensions.get('window').width),
              }}
              numberOfLines={1}
              ellipsizeMode="tail">
              {storeName}
            </Title>
          </RowContainer>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate('StoreDetailsScreen', {
                store,
                seeDistance,
              })
            }
            style={{ paddingLeft: 10 }}>
            <FontAwesome5
              name="info-circle"
              solid
              size={30}
              color={Colors.primaryOrange}
            />
          </TouchableOpacity>
        </SpaceBetweenRowContainer>
        {/* Accepted Program Tags */}
        {(snapOrEbtAccepted ||
          wic ||
          couponProgramPartner ||
          rewardsAccepted) && (
          <InLineContainer
            style={{
              flexWrap: 'wrap',
              marginTop: 6,
            }}>
            {snapOrEbtAccepted && <ProgramTag program="EBT" />}
            {wic && <ProgramTag program="WIC" />}
            {couponProgramPartner && <ProgramTag program="SNAP Match" />}
            {rewardsAccepted && <ProgramTag program="Healthy Rewards" />}
          </InLineContainer>
        )}
        {seeDistance && (
          <Caption
            style={{ marginBottom: 4, marginTop: 4 }}
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
        <TouchableOpacity
          disabled={storeList || !phoneNumber}
          onPress={() => {
            Linking.openURL('tel://'.concat(phoneNumber.replace(/\D/g, '')));
          }}
          onLongPress={() => writeToClipboard(phoneNumber)}>
          <InLineContainer style={{ alignItems: 'center' }}>
            <FontAwesome5
              name="phone"
              solid
              size={16}
              color={Colors.secondaryText}
            />
            <StoreDetailText>
              {phoneNumber || 'Phone number unavailable'}
            </StoreDetailText>
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
  storeList: PropTypes.bool,
  seeDistance: PropTypes.bool.isRequired,
};

StoreCard.defaultProps = {
  store: null,
  storeList: false,
};
