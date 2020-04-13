import { DrawerItemList } from '@react-navigation/drawer';
import PropTypes from 'prop-types';
import React from 'react';
import { AsyncStorage, Linking, TouchableOpacity, View } from 'react-native';
import * as Sentry from 'sentry-expo';
import { Title } from '../components/BaseComponents';
import Colors from '../constants/Colors';
import { getCustomersById } from '../lib/airtable/request';
import { logErrorToSentry } from '../lib/logUtils';

class DrawerContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customer: null,
      link: 'http://tiny.cc/RewardsFeedback',
      isLoading: true,
    };
  }

  async componentDidMount() {
    try {
      const customerId = await AsyncStorage.getItem('userId');
      let customer = null;
      if (customerId != null) {
        customer = await getCustomersById(customerId);
      } else {
        customer = { name: 'Guest' };
      }
      Sentry.configureScope(scope => {
        scope.setUser({
          id: customerId,
          username: customer.name,
          phoneNumber: customer.phoneNumber,
        });
      });
      this.setState({ customer, isLoading: false });
    } catch (err) {
      console.error('[DrawerContent] Airtable:', err);
      logErrorToSentry({
        screen: 'DrawerContent',
        action: 'componentDidMount',
        error: err,
      });
    }
  }

  _logout = async () => {
    AsyncStorage.clear();
    Sentry.configureScope(scope => scope.clear());
    this.props.navigation.navigate('Auth');
  };

  render() {
    if (this.state.isLoading) {
      return null;
    }
    return (
      <View
        style={{
          display: 'flex',
          flex: 1,
          flexDirection: 'column',
        }}>
        <View
          style={{
            backgroundColor: Colors.black,
            height: 114,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-end',
            padding: 16,
          }}>
          <Title style={{ color: 'white' }}>{this.state.customer.name}</Title>
        </View>
        <DrawerItemList {...this.props} />
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-end',
            verticalAlign: 'bottom',
          }}>
          <TouchableOpacity
            style={{ padding: 16 }}
            onPress={() => Linking.openURL(this.state.link)}>
            <Title>Report Issue</Title>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ paddingLeft: 16, paddingBottom: 21 }}
            onPress={() => this._logout()}>
            <Title>Log Out</Title>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default DrawerContent;

DrawerContent.propTypes = {
  navigation: PropTypes.object.isRequired,
};
