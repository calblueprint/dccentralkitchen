import React from 'react';
import { styles, Button, ScrollCategory } from '../styles.js';

import {
  Text,
  View,
  FlatList,
  TouchableOpacity
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';


import { BASE } from "../lib/common.js"
const storesTable = BASE("Stores").select({view: "Grid view"});

var stores;
storesTable.firstPage((err, records) => {
  if (err) {
    console.error(err);
    return;
  }
  stores = records.map(record => createStoreData(record));
});

const initialRegion = {
  latitude: 38.905548,
  longitude: -77.036623,
  latitudeDelta: 0.0922,
  longitudeDelta: 0.0421,
};

class StoresScreen extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        region: initialRegion,
        stores: stores
      };
    }

    onRegionChange = region => {
      this.setState({ region: region });
    }

    handleMarkerPress = store => {
      this.props.navigation.navigate('StoresDetailed', {
        currentStore: store
      });
    };

    render() {
        return (
            <MapView 
              style={{flex: 1}}
              region={this.state.region}
              onRegionChange={this.onRegionChange}>
                {this.state.stores.map(store => (
                  <Marker
                    coordinate={{latitude: store.latitude, longitude: store.longitude}}
                    title={store.name}
                    description={store.name}
                    onPress={() => this.handleMarkerPress(store)}
                  />
                ))}
            </MapView>
        )
    }
}




function createStoreData(record) {
    object = record.fields
    return {
      name: object['Store Name'],
      id: record.id,
      latitude: object['Latitude'],
      longitude: object['Longitude'],
      hours: object['Store Hours'],
      address: object['Address']
    }
}


export default StoresScreen;
