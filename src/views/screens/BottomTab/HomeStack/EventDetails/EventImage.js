import React from "react";
import { View, Text, ImageBackground } from "react-native";
import styles from "./style";
const EventImage = ({ isActive, source }) => {
  return (
    <ImageBackground
      source={source}
      style={styles.EventImage}
    ></ImageBackground>
  );
};

export default EventImage;
