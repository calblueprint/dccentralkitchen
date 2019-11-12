import React from "react";
import { TouchableOpacity, View } from "react-native";

import { H3, Subtitle } from "../styles";

/**
 * @prop
 **/

function StoreCard({ store, callBack }) {
  // Don't know if this is the best way or if there is a way to not pass in navigation as props
  const { name, id, latitude, longitude, hours, address } = store;
  return (
    <View style={{ marginBottom: 10 }}>
      <TouchableOpacity onPress={callBack}>
        <Subtitle>{name}</Subtitle>
        <H3>{address}</H3>
        <H3>{hours}</H3>
      </TouchableOpacity>
    </View>
  );
}

export default StoreCard;
