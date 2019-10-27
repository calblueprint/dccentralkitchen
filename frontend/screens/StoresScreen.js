import React from 'react';
import Airtable from 'airtable';
import { styles, Button, ScrollCategory } from '../styles.js';

import {
  Text,
  View,
  FlatList,
  TouchableOpacity
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import MapView from 'react-native-maps';


import { BASE } from "../lib/common.js"
const storesTable = BASE("Stores").select({view: "Grid view"})
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
        region: initialRegion
      };
    }
    
    render() {
        return (
          <MapView
            style={{flex: 1}}
            region={this.state.region}
            onRegionChange={this.onRegionChange}
         />
        )
    }
}



function createStoreData(record) {
    object = record.fields
    return {
    }
}

export default StoresScreen;
