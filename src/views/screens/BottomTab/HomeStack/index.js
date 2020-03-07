import React from "react";
import HomeMainScreen from "./HomeMainScreen";
import CategoryList from "./CategoryList";
import EventList from "./EventList";
import EventDetails from "./EventDetails";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
const EventSack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeMainScreen} />
    <Stack.Screen name="CategoryList" component={CategoryList} />
    <Stack.Screen name="EventList" component={EventList} />
    <Stack.Screen name="EventDetails" component={EventDetails} />
  </Stack.Navigator>
);
export default EventSack;
