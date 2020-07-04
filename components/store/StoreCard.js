import { FontAwesome5 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import * as Analytics from 'expo-firebase-analytics';
import PropTypes from 'prop-types';
import React from 'react';
import * as Linking from 'expo-linking';
import Colors from '../../constants/Colors';
import Window from '../../constants/Layout';
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
import { ButtonContainer, Caption, Title } from '../BaseComponents';
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
    <ButtonContainer
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
                maxWidth: getMaxWidth(Window.width),
              }}
              numberOfLines={1}
              ellipsizeMode="tail">
              {storeName}
            </Title>
          </RowContainer>
          <ButtonContainer
            onPress={() => {
              Analytics.logEvent('view_store_details', {
                store_name: storeName,
              });
              navigation.navigate('StoreDetailsScreen', {
                store,
                seeDistance,
              });
            }}
            style={{ paddingLeft: 10 }}>
            <FontAwesome5
              name="info-circle"
              solid
              size={30}
              color={Colors.primaryOrange}
            />
          </ButtonContainer>
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
            {snapOrEbtAccepted && <ProgramTag program="SNAP/EBT" />}
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
        <ButtonContainer
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
        </ButtonContainer>
        <ButtonContainer
          disabled={storeList || !phoneNumber}
          onPress={() => {
            Analytics.logEvent('click_phone_number', {
              store_name: storeName,
              store_phone_number: phoneNumber,
            });
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
        </ButtonContainer>

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
    </ButtonContainer>
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
