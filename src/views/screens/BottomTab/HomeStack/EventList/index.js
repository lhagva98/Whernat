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
const EventList = ({ navigation }) => {
  const [refreshing, setRefreshing] = React.useState(false);
  const [featured, setFeatured] = React.useState(null);
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, [refreshing]);

  React.useEffect(() => {
    const getData = async () => {
      let featuredEvents = [];
      let myInterested = [];
      let snapshot = await db.collection("Events").get();
      snapshot.forEach(doc => {
        const eventItem = doc.data();
        eventItem.id = doc.id;
        featuredEvents.push(eventItem);
      });
      setFeatured(featuredEvents);
    };
    getData();
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
