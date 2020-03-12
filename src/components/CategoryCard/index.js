import React from "react";
import { View, Text, Image } from "react-native";
import TouchAble from "../TouchAble";
import styles from "./style";
import Icon from "react-native-vector-icons/FontAwesome5";

const Card = ({ name, count, interested, clicked }) => {
  const [img, setImage] = React.useState(
    require("../../../asset/img/event.jpeg")
  );
  // React.useEffect(() => {
  //   storage
  //     .ref(imagePath)
  //     .getDownloadURL()
  //     .then(function(url) {
  //       setImage({ uri: url });
  //     });
  // }, []);
  return (
    <TouchAble style={styles.card} onPress={clicked}>
      <View style={styles.cardBody}>
        <Image source={img} style={styles.image} />
        {interested && (
          <Icon
            name="star"
            color={"red"}
            size={15}
            style={{ position: "absolute", right: 10, top: 10 }}
          />
        )}
      </View>
      <View style={styles.footer}>
        <Text style={styles.category}>{name}</Text>
        <Text style={styles.count}>[{count}]</Text>
      </View>
    </TouchAble>
  );
};
export default Card;
