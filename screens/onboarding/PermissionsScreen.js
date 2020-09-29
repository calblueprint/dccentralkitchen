import * as Analytics from 'expo-firebase-analytics';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import geo2zip from 'geo2zip';
import PropTypes from 'prop-types';
import React from 'react';
import { AsyncStorage, Image, View } from 'react-native';
import {
  ButtonLabel,
  FilledButtonContainer,
  OutlinedButtonContainer,
  Subtitle,
  Title,
} from '../../components/BaseComponents';
import Colors from '../../constants/Colors';
import Window from '../../constants/Layout';
import { initialRegion } from '../../constants/Map';
import RecordIds from '../../constants/RecordIds';
import { updateCustomers } from '../../lib/airtable/request';
import { sendTextMessage } from '../../lib/authUtils';
import { logErrorToSentry } from '../../lib/logUtils';
import { findDistance, getStoreData } from '../../lib/mapUtils';
import { PermissionsContainer } from '../../styled/auth';
import { ColumnContainer } from '../../styled/shared';

const deltas = {
  latitudeDelta: 0.01,
  longitudeDelta: 0.01,
};

export default class PermissionsScreen extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      locationErrorMsg: null,
      region: initialRegion,
      stores: null,
      store: null,
      showDefaultStore: false,
      step: 1,
    };
  }

  async getLocation() {
    await this._findCurrentLocation();
    this.navigateStoreSelect();
  }

  _findCurrentLocation = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    // Error message not checked anywhere
    if (status !== 'granted') {
      this.setState({
        locationErrorMsg: 'Permission to access location was denied',
      });
      Analytics.setUserProperty('location_permissions', 'denied');
    } else {
      try {
        const location = await Location.getCurrentPositionAsync({
          timeout: 3000,
        });
        const region = {
          latitude: location.coords.latitude - deltas.latitudeDelta / 3.5,
          longitude: location.coords.longitude,
          ...deltas,
        };
        Analytics.setUserProperty('location_permissions', 'granted');
      } catch (err) {
        console.log(err);
        this.setState({
          locationErrorMsg: 'Permission to access location was denied',
        });
        Analytics.setUserProperty('location_permissions', 'error');
        logErrorToSentry({
          screen: 'MapScreen',
          function: '_findCurrentLocation',
          error: err,
        });
      }
    }
  };

  // Calculate distances and sort by closest to location
  // _findCurrentLocation populates this.state.region with the correct lat/lon
  // Since it's initially set to a default value, we use that instead of this.state.location
  _orderStoresByDistance = async (stores) => {
    const sortedStores = [];
    // Display distance in the StoreList
    await stores.forEach(async (store) => {
      const currStore = store;
      currStore.distance = findDistance(this.state.region, store);
      const [closestZip] = await geo2zip(currStore);
      currStore.zip = closestZip;
      sortedStores.push(currStore);
    });
    // sorts in place
    sortedStores.sort(function compare(a, b) {
      return a.distance - b.distance;
    });

    const defaultStore = stores.find((store) => {
      return store.id === RecordIds.defaultStoreId;
    });

    const region = {
      latitude: defaultStore.latitude,
      longitude: defaultStore.longitude,
      ...deltas,
    };

    // Condition for showDefaultStore requires prevState, so a little messy
    this.setState((prevState) => ({
      stores: sortedStores,
      store:
        prevState.locationErrorMsg || sortedStores[0].distance > 100
          ? defaultStore
          : sortedStores[0],
      showDefaultStore: prevState.locationErrorMsg
        ? true
        : sortedStores[0].distance > 100,
      region:
        prevState.locationErrorMsg || sortedStores[0].distance > 100
          ? region
          : prevState.region,
    }));
    Analytics.setUserProperty(
      'closest_store',
      this.state.showDefaultStore ? 'default' : this.state.store.storeName
    );
  };

  updateStep = () => {
    this.setState({ step: 2 });
  };

  // The state is initially populated with stores by calling the Airtable API to get all store records
  _populateInitialStores = async () => {
    try {
      const stores = await getStoreData();

      // Sets list of stores in state, populates initial products
      await this._orderStoresByDistance(stores);
    } catch (err) {
      console.error(
        '[PermissionsScreen] (_populateInitialStores) Airtable:',
        err
      );
      logErrorToSentry({
        screen: 'PermissionsScreen',
        function: '_populateInitialStores',
        error: err,
      });
    }
  };

  async enableNotifications() {
    try {
      const customerId = await AsyncStorage.getItem('customerId');
      await updateCustomers(customerId, {
        notifications: true,
      });

      const r = await sendTextMessage(
        customerId,
        'Healthy Corners: Thank you for joining Healthy Corners notifications. Reply STOP to unsubscribe.'
      );

      console.log(r ? '[sendTextMessage] Success' : '[sendTextMessage] Failed');
      this.navigateMapScreen();
    } catch (err) {
      console.error('[PermissionsScreen] (enableNotifications) Airtable:', err);
      logErrorToSentry({
        screen: 'PermissionsScreen',
        action: 'enableNotifications',
        error: err,
      });
    }
  }

  async navigateStoreSelect() {
    await this._populateInitialStores();
    this.props.navigation.navigate('StoreSelect', {
      navigation: this.props.navigation,
      showDefaultStore: true,
      stores: this.state.stores,
      updateStep: this.updateStep,
    });
  }

  async navigateMapScreen() {
    this.props.navigation.navigate('App');
  }

  render() {
    return (
      <PermissionsContainer>
        <Subtitle color={Colors.secondaryText}>
          {`Step ${this.state.step} of 2`}
        </Subtitle>
        <View style={{ justifyContent: 'flex-end', alignItems: 'center' }}>
          <Image
            source={
              this.state.step === 1
                ? require('../../assets/images/Onboarding_2.png')
                : require('../../assets/images/Onboarding_3.png')
            }
            style={{
              height: Window.height / 3,
              resizeMode: 'contain',
              marginBottom: 24,
            }}
          />
          <Title textAlign="center">
            {this.state.step === 1
              ? 'What are your go-to corner stores?'
              : 'Can we keep in touch?'}
          </Title>
          <Subtitle textAlign="center">
            {this.state.step === 1
              ? 'Plan your grocery runs knowing what is in stock, store hours, and more.'
              : 'Get notifications when your store gets new deliveries'}
          </Subtitle>
          {/* Display login/get started buttons */}
          <ColumnContainer style={{ marginTop: 40 }} width="100%">
            <FilledButtonContainer
              color={Colors.primaryGreen}
              onPress={() =>
                this.state.step === 1
                  ? this.navigateStoreSelect()
                  : this.enableNotifications()
              }>
              <ButtonLabel color={Colors.lightText}>
                {this.state.step === 1
                  ? 'Show nearby stores'
                  : 'Enable SMS notifications'}
              </ButtonLabel>
            </FilledButtonContainer>
            <OutlinedButtonContainer
              style={{ marginTop: 8 }}
              onPress={() =>
                this.state.step === 1
                  ? this.navigateStoreSelect()
                  : this.navigateMapScreen()
              }>
              <ButtonLabel color={Colors.primaryGreen}>
                {this.state.step === 1 ? 'Search by ZIP or address' : 'Not now'}
              </ButtonLabel>
            </OutlinedButtonContainer>
          </ColumnContainer>
        </View>
      </PermissionsContainer>
    );
  }
}

PermissionsScreen.propTypes = {
  navigation: PropTypes.object.isRequired,
};
