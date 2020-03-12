import React from "react";
import MapView from "react-native-maps";

const Map = ({ navigation, route }) => {
  React.useEffect(() => {
    console.log();
  }, []);
  return (
    <MapView
      style={{ flex: 1 }}
      initialRegion={{
        latitude: route.params.coordinate._latitude,
        longitude: route.params.coordinate._longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421
      }}
    />
  );
};
export default Map;
