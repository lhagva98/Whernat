import React from "react";
import { View, Text, Image, ScrollView } from "react-native";
import styles from "./style";
import Card from "../../../../components/CategoryCard";
import firebase from "react-native-firebase";
const db = firebase.firestore();
const HomeMainScreen = ({ navigation }) => {
  goDetail = type => {
    navigation.navigate("CategoryList", { type: type });
  };
  React.useEffect(() => {
    const getData = async () => {
      let featuredEvents = [];
      let snapshot = await db.collection("events").get();
      snapshot.forEach(doc => {
        const eventItem = doc.data();
        console.log(eventItem);
      });
    };
    getData();
  }, []);

  return (
    <ScrollView style={{ flex: 1 }} contentContainerStyle={styles.container}>
      <View style={styles.row}>
        <Card
          name="Спорт"
          count={1}
          interested={true}
          clicked={() => goDetail("sport")}
        />
        <Card
          name="Дуу хөгжим"
          count={8}
          interested={false}
          clicked={() => goDetail("music")}
        />
      </View>
    </ScrollView>
  );
};

export default HomeMainScreen;
