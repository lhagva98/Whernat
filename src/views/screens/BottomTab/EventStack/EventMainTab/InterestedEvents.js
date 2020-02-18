import React from 'react';
import {View,Text,FlatList,RefreshControl} from 'react-native';
import Event from '../../../../../components/Event';
import firebase from 'react-native-firebase';
import styles from './style';
const db = firebase.firestore();
function wait(timeout) {
    return new Promise(resolve => {
      setTimeout(resolve, timeout);
    });
  }
const InterestedEvents = ({navigation})=>{
    const [interested,setInterested] = React.useState(null);
    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
    
        wait(2000).then(() => setRefreshing(false));
      }, [refreshing]);
  
    React.useEffect(() => {
        const getData = async () => {
            let myInterested = [];
            const uid = firebase.auth().currentUser.uid;
            const snapshot =  await db.collection('users').doc(uid).get();
            const interested = snapshot.data().interested;
            if(interested.length > 0){
                const snapshot = await db.collection('Events').where('documentId','in',interested).get();
                console.log(interested);
                snapshot.forEach((doc) => {
                    const eventItem = doc.data();
                    eventItem.id = doc.id;
                    myInterested.push(eventItem); 
                  });
                console.log(myInterested);
                setInterested(myInterested);
            }
          };
          getData();
    }, []);
    return(
        <FlatList
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
            contentContainerStyle={styles.eventContainer}
            data={interested}
            renderItem={({ item }) => <Event data={item} navigation={navigation} />}
            keyExtractor={item => item.id}
        />
    )
}
export default InterestedEvents;