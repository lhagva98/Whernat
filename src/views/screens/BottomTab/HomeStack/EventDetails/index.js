import React from "react";
import { View, Text, ScrollView } from "react-native";
import styles from "./style";
import EventImage from "./EventImage";
import BannerInfo from "./bannerInfo";
import DetailMap from "./DetailMap";
import OverView from "./OverView";
import JoinUs from "./JoinUs";
import firebase from "react-native-firebase";
const storage = firebase.storage();
const EventDetails = ({ navigation, route }) => {
  const [img, setImage] = React.useState(
    require("../../../../../../asset/img/event.jpeg")
  );
  React.useEffect(() => {
    storage
      .ref(route.params.data.imagePath)
      .getDownloadURL()
      .then(function(url) {
        console.log(url);
        setImage({ uri: url });
      });
  }, []);
  return (
    <ScrollView style={styles.container}>
      <EventImage isInterested={true} source={img} />
      <View style={{ padding: 10 }}>
        <BannerInfo
          logo={route.params.data.logoPath}
          name={route.params.data.name}
          startTime={route.params.data.startTime}
        />
        <DetailMap
          navigation={navigation}
          location={route.params.data.location}
          coordinate={route.params.data.coordinate}
          locationInfo={route.params.data.locationInfo}
        />
      </View>
      <JoinUs navigation={navigation} eventId={"F3jiX6uMASzyCXLLVY69"} />
      <OverView description={route.params.data.description} />
    </ScrollView>
  );
};

export default EventDetails;
