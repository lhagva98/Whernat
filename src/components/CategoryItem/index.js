import React from "react";
import { View, Text } from "react-native";
import TouchAble from "../TouchAble";
import styles from "./style";
import Icon from "react-native-vector-icons/FontAwesome5";
const CategoryItem = props => {
  return (
    <TouchAble style={styles.container} onPress={props.clicked}>
      <Icon name="star" color={"red"} size={30} />
      <Text style={styles.name}>{props.info.name}</Text>
      <Text>{props.count}</Text>
    </TouchAble>
  );
};

export default CategoryItem;
