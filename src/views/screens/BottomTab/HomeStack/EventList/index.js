import React from "react";
import { View, Text, FlatList, RefreshControl } from "react-native";
import Event from "../../../../../components/Event";
import firebase from "react-native-firebase";
import styles from "./style";
const db = firebase.firestore();
function wait(timeout) {
  return new Promise(resolve => {
    setTimeout(resolve, timeout);
  });
}
const EventList = ({ navigation, route }) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [featured, setFeatured] = React.useState(null);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, [refreshing]);

  React.useEffect(() => {
    navigation.setOptions({ title: route.params.events.info.name });
    setFeatured(route.params.events.content);
  }, []);
  return (
    <FlatList
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      contentContainerStyle={styles.eventContainer}
      data={featured}
      renderItem={({ item }) => <Event data={item} navigation={navigation} />}
      keyExtractor={item => item.id}
    />
  );
};

export default EventList;
