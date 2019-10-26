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

class StoresScreen extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
      };
    }
    
    render() {
        return (
          <MapView
          style={{flex: 1}}
          initialRegion={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
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
