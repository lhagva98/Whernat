import React from "react";
import { View, Text } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import TouchAble from "../../../../../components/TouchAble";
import styles from "./style";
const DetailMap = ({
  location,
  name,
  navigation,
  coordinate,
  locationInfo
}) => {
  return (
    <TouchAble
      style={styles.DetailMapContainer}
      onPress={() =>
        navigation.navigate("EventMap", { coordinate: coordinate })
      }
    >
      <Icon
        style={{ width: 50, textAlign: "center" }}
        name="map-pin"
        color={"#cccccc"}
        size={25}
      />
      <View style={[styles.mapRow]}>
        <View style={{ marginLeft: 15 }}>
          <Text style={{ fontSize: 15 }}>{location}</Text>
          <Text style={{ fontSize: 15, opacity: 0.6 }}>{locationInfo}</Text>
        </View>
        <Icon
          style={{ flex: 1, textAlign: "right" }}
          name="angle-right"
          color={"#cccccc"}
          size={20}
        />
      </View>
    </TouchAble>
  );
};

export default DetailMap;
