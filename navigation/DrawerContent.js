import React from 'react';
import { AsyncStorage, Linking, TouchableOpacity, View } from 'react-native';
import { DrawerItems } from 'react-navigation-drawer';
import Colors from '../assets/Colors';
import { Title } from '../components/BaseComponents';
import { getCustomersById } from '../lib/airtable/request';

class DrawerContent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      customer: null,
      link: 'http://tiny.cc/RewardsFeedback',
      isLoading: true
    };
  }

  async componentDidMount() {
    try {
      const customerId = await AsyncStorage.getItem('userId');
      const customer = await getCustomersById(customerId);
      this.setState({ customer, isLoading: false });
    } catch (err) {
      console.error('[DrawerContent] Airtable:', err);
    }
  }

  _logout = async () => {
    AsyncStorage.clear();
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
          flexDirection: 'column'
        }}>
        <View
          style={{
            backgroundColor: Colors.black,
            height: 114,
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'flex-end',
            padding: 16
          }}>
          <Title style={{ color: 'white' }}>{this.state.customer.name}</Title>
        </View>
        <DrawerItems {...this.props} />
        <View
          style={{
            flex: 1,
            flexDirection: 'column',
            justifyContent: 'flex-end',
            verticalAlign: 'bottom'
          }}>
          <TouchableOpacity
            style={{ padding: 16 }}
            onPress={() => Linking.openURL(this.state.link)}>
            <Title>Report Issue</Title>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ paddingLeft: 16, paddingBottom: 21 }}
            onPress={() => this._logout()}>
            <Title>Logout</Title>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default DrawerContent;
