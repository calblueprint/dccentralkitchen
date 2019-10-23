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
import GoogleMapReact from 'google-map-react';

// Initializing DC Base: Can/should it be done somewhere else?
const base = new Airtable({ apiKey: ''}).base(
    "app4fXK49bqcjDMEo"
);
const storesTable = base("Stores").select({view: "Grid view"})

class StoresScreen extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
      };
    }
    
    render() {
        return (
          <GoogleMapReact>
            bootstrapURLKeys={{ key:  }}
            defaultCenter={{lat: 59.95, lng: 30.33}}
            defaultZoom={11}
            <Text>hi </Text>
          </GoogleMapReact>
        )
    }
}

function createStoreData(record) {
    object = record.fields
    return {
    }
}

export default StoresScreen;
