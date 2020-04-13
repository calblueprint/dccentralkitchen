import { DrawerItemList } from '@react-navigation/drawer';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';
import { default as React, default as React } from 'react';
import { AsyncStorage, Linking, TouchableOpacity, View } from 'react-native';
import { Title } from '../components/BaseComponents';
import Colors from '../constants/Colors';
import { getCustomersById } from '../lib/airtable/request';

function DrawerContent(props) {
  const [customer, setCustomer] = React.useState(null);
  const [link, _] = React.useState('http://tiny.cc/RewardsFeedback');
  const [isLoading, setIsLoading] = React.useState(true);
  const navigation = useNavigation();

  useFocusEffect(
    React.useCallback(() => {
      let isActive = true;

      const fetchUser = async () => {
        try {
          const customerId = await AsyncStorage.getItem('userId');
          let cust = null;
          if (customerId != null) {
            cust = await getCustomersById(customerId);
          } else {
            cust = { name: 'Guest' };
          }
          if (isActive) {
            Sentry.configureScope(scope => {
              scope.setUser({
                id: customerId,
                username: cust.name,
                phoneNumber: cust.phoneNumber,
              });
            });
            setCustomer(cust);
            setIsLoading(false);
          }
        } catch (err) {
          console.error('[DrawerContent] Airtable:', err);
        }
      };

      fetchUser();

      return () => {
        isActive = false;
      };
    }, [])
  );

  if (isLoading) {
    return null;
  }
  const logout = async () => {
    AsyncStorage.clear();
    Sentry.configureScope(scope => scope.clear());
    // navigation.navigate('DrawerClose');
    // navigation.navigate('Auth');
    setTimeout(function() {
      navigation.navigate('Auth');
    }, 500);
    props.navigation.closeDrawer();
  };

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
        <Title style={{ color: 'white' }}>{customer.name}</Title>
      </View>
      <DrawerItemList {...props} />
      <View
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'flex-end',
          verticalAlign: 'bottom',
        }}>
        <TouchableOpacity
          style={{ padding: 16 }}
          onPress={() => Linking.openURL(link)}>
          <Title>Report Issue</Title>
        </TouchableOpacity>
        <TouchableOpacity
          style={{ paddingLeft: 16, paddingBottom: 21 }}
          onPress={() => {
            AsyncStorage.clear().then(navigation.navigate('Auth'));
          }}>
          <Title>Log Out</Title>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default DrawerContent;

DrawerContent.propTypes = {
  navigation: PropTypes.object.isRequired,
};
