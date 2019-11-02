import React from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import StoreCard from "./StoreCard";

/**
 * @prop
 **/

function StoresList({ stores, screenChanger }) {
  return (
    <View>
      <ScrollView>
        {stores.map(store => (
          <StoreCard store={store} callBack={() => screenChanger(store)} />
        ))}
      </ScrollView>
    </View>
  );
}

export default StoresList;
