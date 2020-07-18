/* eslint-disable no-nested-ternary */
import { FontAwesome5 } from '@expo/vector-icons';
import AsyncStorage from '@react-native-community/async-storage';
import React from 'react';
import { View } from 'react-native';
import Colors from '../../constants/Colors';
import RecordIds from '../../constants/RecordIds';
import { rewardPointValue } from '../../constants/Rewards';
import { getCustomersById } from '../../lib/airtable/request';
import { logErrorToSentry } from '../../lib/logUtils';
import { Subtitle } from '../BaseComponents';
/**
 * @prop
 * */

export default class RewardsFooter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customer: null,
      isGuest: false,
      rewards: 0,
    };
  }

  async componentDidMount() {
    const customerId = await AsyncStorage.getItem('customerId');
    const isGuest = customerId === RecordIds.guestCustomerId;
    try {
      const customer = await getCustomersById(customerId);
      const rewards = customer
        ? Math.floor(parseInt(customer.points, 10) / rewardPointValue)
        : 0;
      this.setState({
        isGuest,
        customer,
        rewards,
      });
    } catch (err) {
      console.error(err);
      logErrorToSentry({
        screen: 'RewardsFooter',
        action: 'componentDidMount',
        error: err,
      });
    }
  }

  render() {
    return (
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          justifyContent: 'space-between',
          padding: 16,
        }}>
        {this.state.customer && (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <FontAwesome5
              name="star"
              solid
              size={16}
              color={Colors.lightText}
            />
            <Subtitle style={{ paddingLeft: 8 }} color={Colors.lightText}>
              {this.state.isGuest
                ? 'Learn about Healthy Rewards >'
                : this.state.rewards === 1
                ? `${this.state.rewards} reward`
                : this.state.rewards > 0
                ? `${this.state.rewards} rewards`
                : this.state.customer.points === 1
                ? `${this.state.customer.points} point`
                : `${this.state.customer.points || 0} points`}
            </Subtitle>
          </View>
        )}
        {this.state.customer && !this.state.isGuest && (
          <Subtitle color={Colors.lightText}>
            {this.state.rewards > 0
              ? `View your rewards >`
              : `View your points >`}
          </Subtitle>
        )}
      </View>
    );
  }
}
