import React from "react";
import { View, Text, Image } from "react-native";
import TouchAble from "../TouchAble";
import styles from "./style";
import Icon from "react-native-vector-icons/FontAwesome5";
import firebase from "react-native-firebase";
const storage = firebase.storage();
const CategoryItem = props => {
  const [img, setImage] = React.useState(
    require("../../../asset/img/logo.png")
  );
  React.useEffect(() => {
    storage
      .ref(props.info.imagePath)
      .getDownloadURL()
      .then(function(url) {
        setImage({ uri: url });
      });
  }, []);
  return (
    <TouchAble style={styles.container} onPress={props.clicked}>
      <Image source={img} style={styles.image} />
      <Text style={styles.name}>{props.info.name}</Text>
      <Text>{props.count}</Text>
    </TouchAble>
  );
};

export default CategoryItem;
