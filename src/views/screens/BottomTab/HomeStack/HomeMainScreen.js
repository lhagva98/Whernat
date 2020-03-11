import React, { useState } from "react";
import { View, Text, Image, ScrollView } from "react-native";
import styles from "./style";
import Card from "../../../../components/CategoryCard";
import firebase from "react-native-firebase";
const db = firebase.firestore();
const parents = { sport: 0, music: 0, game: 0 };
const HomeMainScreen = ({ navigation }) => {
  const [data, setData] = useState({ sport: { count: 0 } });
  goDetail = type => {
    navigation.navigate("CategoryList", { type: type, list: data[type] });
  };
  React.useEffect(() => {
    const getData = async () => {
      let featuredEvents = [];
      let data = {};
      let rootData = {};
      let events = await db.collection("events").get();
      let categories = await db.collection("categories").get();
      categories.forEach(doc => {
        const item = doc.data();
        data[doc.id] = {
          info: item,
          content: []
        };
      });
      events.forEach(doc => {
        const eventItem = doc.data();
        data[eventItem.category].content.push(eventItem);
      });

      Object.keys(data).forEach(key => {
        let item = data[key];
        if (rootData[item.info.parent] == null) {
          rootData[item.info.parent] = {
            count: 0,
            content: []
          };
        } else {
          rootData[item.info.parent].content.push(item);
          rootData[item.info.parent].count += item.content.length;
        }
      });
      setData(rootData);
    };
    getData();
  }, []);

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
          count={8}
          interested={false}
          clicked={() => goDetail("music")}
        />
      </View>
    </ScrollView>
  );
};

export default HomeMainScreen;
