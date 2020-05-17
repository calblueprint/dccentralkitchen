import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { AsyncStorage, View } from 'react-native';
import Colors from '../../constants/Colors';
import RecordIds from '../../constants/RecordIds';
import { rewardPointValue } from '../../constants/Rewards';
import { getCustomersById } from '../../lib/airtable/request';
import { logErrorToSentry } from '../../lib/logUtils';
import { Subhead } from '../BaseComponents';
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
            <FontAwesome5 name="star" solid size={16} color={Colors.lightest} />
            <Subhead style={{ paddingLeft: 8 }} color={Colors.lightest}>
              {this.state.isGuest
                ? 'Learn about Healthy Rewards >'
                : `${this.state.rewards} rewards`}
            </Subhead>
          </View>
        )}
        {/* &gt; is a code for >, but since we can't use that, we use &gt; */}
        {this.state.customer && !this.state.isGuest && (
          <Subhead color={Colors.lightest}>View your rewards &gt;</Subhead>
        )}
      </View>
    );
  }
}
