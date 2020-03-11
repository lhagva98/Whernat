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
  const [list, setList] = useState([]);
  useEffect(() => {
    setList(route.params.list.content);
  }, []);
  useEffect(() => {}, [input]);

  const navigateToEvents = index => {
    navigation.navigate("EventList", { events: list[index] });
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
        renderItem={({ item, index }) => (
          <CategoryItem
            key={index}
            count={item.content.length}
            info={item.info}
            clicked={() => navigateToEvents(index)}
          />
        )}
        keyExtractor={item => item.id}
      />
    </View>
  );
};

export default CategoryList;
