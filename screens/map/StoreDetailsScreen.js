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
import {
  ColumnContainer,
  InLineContainer,
  RowContainer,
} from '../../styled/shared';
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
              <RowContainer>
                <View
                  style={{
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    justifyContent: 'space-evenly',
                    width: '40%',
                  }}>
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
                      <Caption color={Colors.darkerGreen}>
                        Healthy Rewards
                      </Caption>
                    </Chip>
                  )}
                </View>
                <View
                  style={{
                    flexDirection: 'column',
                    flexWrap: 'wrap',
                    maxWidth: '60%',
                  }}>
                  {snapOrEbtAccepted && (
                    <View style={styles.chipDesc}>
                      <Body>Accepts SNAP/EBT</Body>
                    </View>
                  )}
                  {wic && (
                    <View style={styles.chipDesc}>
                      <Body numberOfLines={1} ellipsizeMode="tail">
                        WIC approved
                      </Body>
                    </View>
                  )}
                  {couponProgramPartner && (
                    <View style={styles.chipDesc}>
                      <Body numberOfLines={1} ellipsizeMode="tail">
                        Accepts SNAP Matching
                      </Body>
                    </View>
                  )}
                  {rewardsAccepted && (
                    <View style={styles.chipDesc}>
                      <Body numberOfLines={1} ellipsizeMode="tail">
                        Accepts Healthy Rewards
                      </Body>
                    </View>
                  )}
                </View>
              </RowContainer>
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
