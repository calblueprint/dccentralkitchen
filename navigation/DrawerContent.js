import React from 'react';
import { AsyncStorage, Linking, TouchableOpacity, View } from 'react-native';
import { DrawerItems } from 'react-navigation-drawer';
import Colors from '../assets/Colors';
import { Title } from '../components/BaseComponents';
import { getUser } from '../lib/rewardsUtils';

class DrawerContent extends React.Component {
  constructor() {
    super();
    this.state = {
      user: {
        id: null,
        name: null
      },
      link: 'http://tiny.cc/RewardsFeedback'
    };
  }

  async componentDidMount() {
    const userId = await AsyncStorage.getItem('userId');
    getUser(userId).then(userRecord => {
      if (userRecord) {
        const user = {
          id: userId,
          name: userRecord.fields.Name
        };
        this.setState({ user });
        return true;
      }
      return false;
    });
  }

  _logout = async () => {
    AsyncStorage.clear();
    this.props.navigation.navigate('Auth');
  };

  render() {
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
          <Title style={{ color: 'white' }}>{this.state.user.name}</Title>
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
