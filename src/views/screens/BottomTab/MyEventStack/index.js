import React from "react";
import MyEventMainScreen from "./MyEventMainScreen";
import { createStackNavigator } from "@react-navigation/stack";
const Stack = createStackNavigator();
const MyEventStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="MyEventMain" component={MyEventMainScreen} />
  </Stack.Navigator>
);
export default MyEventStack;
