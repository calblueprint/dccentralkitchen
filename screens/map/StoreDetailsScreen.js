import { FontAwesome5 } from '@expo/vector-icons';
import { Linking } from 'expo';
import PropTypes from 'prop-types';
import React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import {
  Body,
  Caption,
  NavButton,
  NavHeaderContainer,
  NavTitle,
  TabSelected,
} from '../../components/BaseComponents';
import AcceptedPrograms from '../../components/store/AcceptedPrograms';
import StoreHours from '../../components/store/StoreHours';
import Colors from '../../constants/Colors';
import { openDirections, writeToClipboard } from '../../lib/mapUtils';
import { ColumnContainer, InLineContainer } from '../../styled/shared';

export default class StoreDetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { store } = this.props.route.params;
    const {
      storeName,
      storeHours,
      storeOpenStatus,
      address,
      distance,
      ward,
      phoneNumber,
      snapOrEbtAccepted,
      couponProgramPartner,
      wic,
      rewardsAccepted,
      latitude,
      longitude,
    } = store;

    return (
      <View>
        <NavHeaderContainer withMargin>
          <NavButton onPress={() => this.props.navigation.goBack()}>
            <FontAwesome5 name="arrow-left" solid size={24} />
          </NavButton>
          <NavTitle>{storeName}</NavTitle>
        </NavHeaderContainer>
        <ScrollView style={{ marginLeft: 16, marginTop: 30 }}>
          {/* Directions */}
          <View style={{ paddingBottom: 32 }}>
            <InLineContainer>
              <FontAwesome5
                name="directions"
                size={24}
                color={Colors.activeText}
              />
              <View
                style={{
                  flexDirection: 'column',
                  paddingLeft: 12,
                  paddingRight: 50,
                  flexWrap: 'wrap',
                }}>
                <TouchableOpacity onLongPress={() => writeToClipboard(address)}>
                  <Body>{address}</Body>
                </TouchableOpacity>
                <Body>{`Ward ${ward}`}</Body>
                <View style={{ flex: 1, marginBottom: 10 }}>
                  <Caption style={{ flex: 1 }} color={Colors.secondaryText}>
                    {`${distance} miles away · distance may vary by transportation`}
                  </Caption>
                </View>
                <TouchableOpacity
                  style={{ flexDirection: 'row' }}
                  onPress={() =>
                    openDirections(latitude, longitude, storeName)
                  }>
                  <TabSelected
                    color={Colors.primaryOrange}
                    style={{ marginRight: 4 }}>
                    Get Directions
                  </TabSelected>
                  <FontAwesome5
                    name="external-link-alt"
                    size={14}
                    color={Colors.primaryOrange}
                  />
                </TouchableOpacity>
              </View>
            </InLineContainer>
          </View>
          {/* Phone Number */}
          {phoneNumber ? (
            <TouchableOpacity
              onPress={() =>
                Linking.openURL('tel://'.concat(phoneNumber.replace(/\D/g, '')))
              }
              onLongPress={() => writeToClipboard(phoneNumber)}>
              <InLineContainer
                style={{ alignItems: 'center', paddingBottom: 32 }}>
                <FontAwesome5
                  name="phone"
                  solid
                  size={24}
                  color={Colors.activeText}
                />
                <Body style={{ marginLeft: 12 }}>{phoneNumber}</Body>
              </InLineContainer>
            </TouchableOpacity>
          ) : (
            <InLineContainer
              style={{ alignItems: 'center', paddingBottom: 32 }}>
              <FontAwesome5
                name="phone"
                solid
                size={24}
                color={Colors.activeText}
              />
              <Body style={{ marginLeft: 12 }}>Phone number unavailable</Body>
            </InLineContainer>
          )}
          {/* Store Hours */}
          <InLineContainer style={{ paddingBottom: 32 }}>
            <FontAwesome5
              name="clock"
              solid
              size={24}
              color={Colors.activeText}
              style={{ marginRight: 12 }}
            />
            <View style={{ display: 'flex', flexDirection: 'column' }}>
              <Body
                color={
                  storeOpenStatus.includes('Open')
                    ? Colors.primaryGreen
                    : Colors.activeText
                }
                style={{ marginBottom: 4 }}>
                {storeOpenStatus}
              </Body>
              <StoreHours hours={storeHours} />
            </View>
          </InLineContainer>
          {/* Accepted Programs */}
          <InLineContainer style={{ paddingBottom: 32 }}>
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
              {snapOrEbtAccepted ||
              wic ||
              couponProgramPartner ||
              rewardsAccepted ? (
                <AcceptedPrograms
                  snapOrEbtAccepted={snapOrEbtAccepted}
                  wic={wic}
                  couponProgramPartner={couponProgramPartner}
                  rewardsAccepted={rewardsAccepted}
                />
              ) : (
                <Body color={Colors.secondaryText}>
                  No programs accepted at this time
                </Body>
              )}
            </ColumnContainer>
          </InLineContainer>
        </ScrollView>
      </View>
    );
  }
}

StoreDetailsScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};
