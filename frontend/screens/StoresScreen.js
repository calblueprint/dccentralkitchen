import React from "react";
import { Title, StoreModalBar, styles } from "../styles";
import { View, StyleSheet } from "react-native";
import BottomSheet from "reanimated-bottom-sheet";
import MapView, { Marker } from "react-native-maps";
import StoreCard from "../components/StoreCard";
import { ScrollView } from "react-native-gesture-handler";


import { BASE } from "../lib/common";

const storesTable = BASE("Stores").select({ view: "Grid view" });
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
  longitudeDelta: 0.0421
};

class StoresScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      region: initialRegion,
      stores: stores
    };
  }

  renderHeader = () => ( // TODO @tommypoa Favourites functionality
    <View style={styles.storesModal}>
      <StoreModalBar />
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Title>Nearby</Title>
        {/* <Title>Favourites</Title> */}
      </View>
    </View>
  );

  renderInner = () => (
    <View style={styles.storesModal}>
      <View>
        <ScrollView>
          {stores.map(store => (
            <StoreCard store={store} callBack={() => this.detailedStoreTransition(store)} />
          ))}
        </ScrollView>
      </View>
    </View>
  );

  onRegionChange = region => {
    this.setState({ region: region });
  };

  detailedStoreTransition = store => {
    this.props.navigation.navigate("StoresDetailed", {
      currentStore: store
    });
  };

  render() {
    return (
      <View style={{ ...StyleSheet.absoluteFillObject }}>
        <MapView
          style={{ flex: 100 }}
          region={this.state.region}
          onRegionChange={this.onRegionChange}
        >
          {this.state.stores.map(store => (
            <Marker
              coordinate={{
                latitude: store.latitude,
                longitude: store.longitude
              }}
              title={store.name}
              description={store.name}
              onPress={() => this.detailedStoreTransition(store)}
            />
          ))}
        </MapView>
        <View style={{ flex: 1 }}>
          <BottomSheet
            initialSnap={1}
            enabledInnerScrolling={true}
            enabledGestureInteraction={true}
            snapPoints={["80%", "40%", "10%"]}
            renderContent={this.renderInner}
            renderHeader={this.renderHeader}
          />
        </View>
      </View>
    );
  }
}

function createStoreData(record) {
  object = record.fields;
  return {
    name: object["Store Name"],
    id: record.id,
    latitude: object["Latitude"],
    longitude: object["Longitude"],
    hours: object["Store Hours"],
    address: object["Address"]
  };
}

export default StoresScreen;
