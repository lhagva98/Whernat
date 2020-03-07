import React, { useState, useEffect, useCallback } from "react";
import { View, Text, FlatList, RefreshControl } from "react-native";
import styles from "./style";
import CategorySearch from "../../../../../components/CategorySearch";
import CategoryItem from "../../../../../components/CategoryItem";
import firebase from "react-native-firebase";
const db = firebase.firestore();
function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}
const CategoryList = ({ route, navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [input, setInput] = useState("");
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, [refreshing]);
  const [list] = useState([
    {
      name: "Математик",
      id: 1,
      count: 1
    },
    {
      name: "Математик",
      id: 2,
      count: 2
    },
    {
      name: "Математик",
      id: 3,
      count: 3
    }
  ]);

  useEffect(() => {}, [input]);

  const navigateToEvents = catId => {
    navigation.navigate("EventList");
  };

  return (
    <View style={styles.container}>
      {/* <CategorySearch onChange={setInput} /> */}
      {/* <Text>{route.params.type}</Text> */}
      <FlatList
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        contentContainerStyle={styles.list}
        data={list}
        renderItem={({ item }) => (
          <CategoryItem
            key={item.id}
            data={item}
            clicked={() => navigateToEvents(item.id)}
          />
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default CategoryList;
