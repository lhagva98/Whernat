import React from "react";
import HomeMainScreen from "./HomeMainScreen";
import CategoryList from "./CategoryList";
import EventList from "./EventList";
import EventDetails from "./EventDetails";
import EventMap from "../../../../components/eventMap";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
const EventSack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeMainScreen} />
    <Stack.Screen name="CategoryList" component={CategoryList} />
    <Stack.Screen name="EventList" component={EventList} />
    <Stack.Screen name="EventDetails" component={EventDetails} />
    <Stack.Screen name="EventMap" component={EventMap} />
  </Stack.Navigator>
);
export default EventSack;
