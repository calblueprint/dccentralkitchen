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
          <View>
            <Text> Hello </Text>
          </View>
        )
    }
}

function createStoreData(record) {
    object = record.fields
    return {
    }
}

export default StoresScreen;
