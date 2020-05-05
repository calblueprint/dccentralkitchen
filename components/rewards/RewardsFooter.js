import { FontAwesome5 } from '@expo/vector-icons';
import React from 'react';
import { AsyncStorage, View } from 'react-native';
import Colors from '../../constants/Colors';
import RecordIds from '../../constants/RecordIds';
import { getCustomersById } from '../../lib/airtable/request';
import { Subhead } from '../BaseComponents';
/**
 * @prop
 * */

export default class RewardsFooter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customer: null,
      transactions: [],
      isLoading: true,
      isGuest: false,
    };
  }
  // Load customer record & transactions
  async componentDidMount() {
    const customerId = await AsyncStorage.getItem('customerId');
    const isGuest = customerId === RecordIds.guestCustomerId;
    try {
      const customer = await getCustomersById(customerId);
      this.setState({
        isGuest,
        customer,
        isLoading: false,
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
                : `${this.state.customer.points} points`}
            </Subhead>
          </View>
        )}
        {this.state.customer && !this.state.isGuest && (
          <Subhead color={Colors.lightest}>Your next reward &gt;</Subhead>
        )}
      </View>
    );
  }
}
