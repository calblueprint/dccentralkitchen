import React from "react";
import { Title } from "../styles.js";
import { View, StyleSheet } from "react-native";
import BottomSheet from "reanimated-bottom-sheet";
import MapView, { Marker } from "react-native-maps";

import { BASE } from "../lib/common.js";
import StoresList from "../components/StoresList";

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

  renderInner = () => (
    <View style={{ backgroundColor: "white", opacity: 0.8 }}>
      <StoresList
        stores={this.state.stores}
        screenChanger={store => this.detailedStoreTransition(store)}
      />
    </View>
  );

  renderHeader = () => (
    <View
      style={{
        backgroundColor: "white",
        opacity: 0.8
      }}
    >
      <View
        style={{
          borderBottomColor: "black",
          borderBottomWidth: 5,
          borderRadius: 2,
          height: 15,
          width: 50,
          marginLeft: "40%"
        }}
      />
      <View style={{ flexDirection: "row", justifyContent: "center" }}>
        <Title>Nearby</Title>
        <Title>Favourites</Title>
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
