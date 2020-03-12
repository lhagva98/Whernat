import React from "react";
import { View, Text, Image } from "react-native";
import styles from "./style";
import firebase from "react-native-firebase";
const storage = firebase.storage();
const BannerInfo = ({ logo, name, startTime }) => {
  console.log(startTime);
  const [img, setImage] = React.useState(
    require("../../../../../../asset/img/event.jpeg")
  );
  React.useEffect(() => {
    storage
      .ref(logo)
      .getDownloadURL()
      .then(function(url) {
        console.log(url);
        setImage({ uri: url });
      });
  }, []);
  return (
    <View style={styles.BannerInfoContainer}>
      <Image source={img} style={styles.bannerImage} />
      <View style={styles.bannerInfo}>
        <Text style={styles.bannerName}>{name}</Text>
        <Text style={styles.bannerTime}>{"2020-03-31 12:00 AM"}</Text>
      </View>
    </View>
  );
};

export default BannerInfo;
