import React from "react";
import { View, Text } from "react-native";

const OverView = ({ description }) => {
  return (
    <View style={{ padding: 10 }}>
      <Text>{description}</Text>
    </View>
  );
};

export default OverView;
