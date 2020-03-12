import React, { useState, useContext } from "react";
import { View, Text, Image, ScrollView } from "react-native";
import styles from "./style";
import Card from "../../../../components/CategoryCard";
import { DataFlowContext } from "../../.././../../App";
import firebase from "react-native-firebase";
const db = firebase.firestore();
const HomeMainScreen = ({ navigation }) => {
  const [data, setData] = useState(React.useContext(DataFlowContext));

  goDetail = type => {
    navigation.navigate("CategoryList", { type: type, list: data[type] });
  };
  React.useEffect(() => {}, []);
  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
      <View style={styles.row}>
        <Card
          name="Спорт"
          count={data["sport"].count}
          interested={true}
          clicked={() => goDetail("sport")}
        />
        <Card
          name="Дуу хөгжим"
          count={data["music"].count}
          interested={false}
          clicked={() => goDetail("music")}
        />
      </View>
    </ScrollView>
  );
};

export default HomeMainScreen;
