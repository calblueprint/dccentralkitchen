import { FontAwesome5 } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { Chip } from 'react-native-paper';
import {
  Body,
  Caption,
  NavButton,
  NavHeaderContainer,
  NavTitle,
} from '../../components/BaseComponents';
import StoreHours from '../../components/store/StoreHours';
import Colors from '../../constants/Colors';
import { formatPhoneNumber } from '../../lib/authUtils';
import { InLineContainer } from '../../styled/shared';
import { styles } from '../../styled/store';

export default class StoreDetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { store, storeOpenStatus } = this.props.route.params;
    const {
      storeName,
      storeHours,
      address,
      distance,
      ward,
      phoneNumber,
      snapOrEbtAccepted,
      couponProgramPartner,
      wic,
      rewardsAccepted,
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
          <TouchableOpacity style={{ paddingBottom: 32 }}>
            <InLineContainer style={{ alignItems: 'center' }}>
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
                <Body>{address}</Body>
                <Body>Ward {ward}</Body>
                <View style={{ flex: 1 }}>
                  <Caption style={{ flex: 1 }} color={Colors.secondaryText}>
                    {distance} miles away · distance may vary by transportation
                  </Caption>
                </View>
              </View>
            </InLineContainer>
          </TouchableOpacity>
          {/* Phone Number */}
          <InLineContainer style={{ alignItems: 'center', paddingBottom: 32 }}>
            <FontAwesome5
              name="phone"
              solid
              size={24}
              color={Colors.activeText}
            />
            <Body style={{ marginLeft: 12 }}>
              {phoneNumber
                ? formatPhoneNumber(phoneNumber)
                : 'Phone number unavailable'}
            </Body>
          </InLineContainer>
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
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              flexWrap: 'wrap',
            }}>
            <InLineContainer
              style={{ alignItems: 'center', paddingBottom: 32 }}>
              <FontAwesome5
                name="star"
                solid
                size={24}
                color={Colors.activeText}
              />
              <Body style={{ marginLeft: 12 }}>Accepted Programs</Body>
            </InLineContainer>
            {/* Chips */}
            <View style={{ flexDirection: 'row' }}>
              <View
                style={{
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'space-evenly',
                  width: '40%',
                }}>
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
                    Snap Match
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
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  flexWrap: 'wrap',
                  justifyContent: 'center',
                  maxWidth: '60%',
                }}>
                {snapOrEbtAccepted && (
                  <View style={styles.chipDesc}>
                    <Body>Accepts SNAP/EBT</Body>
                  </View>
                )}
                {wic && (
                  <View style={styles.chipDesc}>
                    <Body>WIC approved</Body>
                  </View>
                )}
                {couponProgramPartner && (
                  <View style={styles.chipDesc}>
                    <Body>Participates in SNAP Matching</Body>
                  </View>
                )}
                {rewardsAccepted && (
                  <View style={styles.chipDesc}>
                    <Body>Participates in Healthy Rewards</Body>
                  </View>
                )}
              </View>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

StoreDetailsScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
  route: PropTypes.object.isRequired,
};
