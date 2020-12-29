import { FontAwesome5 } from '@expo/vector-icons';
import * as Analytics from 'expo-firebase-analytics';
import * as Linking from 'expo-linking';
import PropTypes from 'prop-types';
import React from 'react';
import { ScrollView, View } from 'react-native';
import {
  Body,
  ButtonContainer,
  ButtonLabel,
  Caption,
  NavButtonContainer,
  NavHeaderContainer,
  NavTitle,
} from '../../components/BaseComponents';
import AcceptedPrograms from '../../components/store/AcceptedPrograms';
import StoreHours from '../../components/store/StoreHours';
import Colors from '../../constants/Colors';
import { openDirections, writeToClipboard } from '../../lib/mapUtils';
import { ColumnContainer, InLineContainer } from '../../styled/shared';

export default function StoreDetailsScreen(props) {
  const { store, storeDistance } = props.route.params;

  return (
    <View style={{ flex: 1 }}>
      <NavHeaderContainer>
        <NavButtonContainer onPress={() => props.navigation.goBack()}>
          <FontAwesome5 name="arrow-left" solid size={24} />
        </NavButtonContainer>
        <NavTitle>{store.storeName}</NavTitle>
      </NavHeaderContainer>
      <ScrollView style={{ marginLeft: 16 }}>
        {/* Accepted Programs */}
        <InLineContainer style={{ paddingBottom: 32, marginTop: 30 }}>
          <FontAwesome5
            name="star"
            solid
            size={24}
            color={Colors.activeText}
            style={{ marginRight: 12 }}
          />
          <ColumnContainer style={{ width: '100%' }}>
            <Body style={{ marginBottom: 8 }}>Accepted Programs</Body>
            {/* Chips */}
            {store.snapOrEbtAccepted ||
            store.wic ||
            store.couponProgramPartner ||
            store.rewardsAccepted ? (
              <AcceptedPrograms
                snapOrEbtAccepted={store.snapOrEbtAccepted}
                wic={store.wic}
                couponProgramPartner={store.couponProgramPartner}
                rewardsAccepted={store.rewardsAccepted}
              />
            ) : (
              <Body color={Colors.secondaryText}>
                No programs accepted at this time
              </Body>
            )}
          </ColumnContainer>
        </InLineContainer>
        {/* Directions */}
        <View style={{ paddingBottom: 32 }}>
          <InLineContainer>
            <FontAwesome5
              name="directions"
              size={24}
              color={Colors.activeText}
            />
            <ColumnContainer
              style={{
                paddingLeft: 12,
                paddingRight: 50,
              }}>
              <ButtonContainer
                onPress={() =>
                  openDirections(
                    store.latitude,
                    store.longitude,
                    store.storeName
                  )
                }
                onLongPress={() => writeToClipboard(store.address)}>
                <Body>{store.address}</Body>
              </ButtonContainer>
              <Body>{`Ward ${store.ward}`}</Body>
              <View style={{ flex: 1, marginBottom: 10 }}>
                {storeDistance && (
                  <Caption style={{ flex: 1 }} color={Colors.secondaryText}>
                    {`${storeDistance} miles away · distance may vary by transportation`}
                  </Caption>
                )}
              </View>
              <ButtonContainer
                style={{ flexDirection: 'row', alignItems: 'center' }}
                onPress={() =>
                  openDirections(
                    store.latitude,
                    store.longitude,
                    store.storeName
                  )
                }>
                <ButtonLabel
                  noCaps
                  color={Colors.primaryOrange}
                  style={{ marginRight: 4 }}>
                  Get Directions
                </ButtonLabel>
                <FontAwesome5
                  name="external-link-alt"
                  size={14}
                  color={Colors.primaryOrange}
                />
              </ButtonContainer>
            </ColumnContainer>
          </InLineContainer>
        </View>
        {/* Phone Number */}
        <ButtonContainer
          disabled={!store.phoneNumber}
          onPress={() => {
            Analytics.logEvent('click_phone_number', {
              store_name: store.storeName,
              store_phone_number: store.phoneNumber,
            });
            Linking.openURL(
              'tel://'.concat(store.phoneNumber.replace(/\D/g, ''))
            );
          }}
          onLongPress={() => writeToClipboard(store.phoneNumber)}>
          <InLineContainer style={{ alignItems: 'center', paddingBottom: 32 }}>
            <FontAwesome5
              name="phone"
              solid
              size={24}
              color={Colors.activeText}
            />
            <Body style={{ marginLeft: 12 }}>
              {store.phoneNumber || 'Phone number unavailable'}
            </Body>
          </InLineContainer>
        </ButtonContainer>
        {/* Store Hours */}
        <InLineContainer style={{ paddingBottom: 32 }}>
          <FontAwesome5
            name="clock"
            solid
            size={24}
            color={Colors.activeText}
            style={{ marginRight: 12 }}
          />
          <ColumnContainer>
            <Body
              color={
                store.storeOpenStatus.includes('Open')
                  ? Colors.primaryGreen
                  : Colors.activeText
              }
              style={{ marginBottom: 4 }}>
              {store.storeOpenStatus}
            </Body>
            <StoreHours hours={store.storeHours} />
          </ColumnContainer>
        </InLineContainer>
      </ScrollView>
    </View>
  );
}

StoreDetailsScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};
