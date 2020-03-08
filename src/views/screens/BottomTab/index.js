import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import EventStack from "./EventStack";
import MyEventStack from "./MyEventStack";
import HomeStack from "./HomeStack";
import Icon from "react-native-vector-icons/FontAwesome";
const Tab = createBottomTabNavigator();
const MainTab = () => (
  <Tab.Navigator
    tabBarOptions={{
      activeTintColor: "#ff3333",
      // inactiveTintColor:'black',
      labelStyle: {
        fontSize: 18,
        color: "black"
      },
      showLabel: false
    }}
  >
    <Tab.Screen
      name="HomeStack"
      component={HomeStack}
      options={{
        tabBarLabel: "Home",
        tabBarIcon: ({ color, size }) => (
          <Icon name="home" color={color} size={size} />
        )
      }}
    />
    <Tab.Screen
      name="EventStack"
      component={EventStack}
      options={{
        tabBarLabel: "Events",
        tabBarIcon: ({ color, size }) => (
          <Icon name="search" color={color} size={size} />
        )
      }}
    />
    <Tab.Screen
      name="MyEventStack"
      component={MyEventStack}
      options={{
        tabBarLabel: "My Events",
        tabBarIcon: ({ color, size }) => (
          <Icon name="user" color={color} size={size} />
        )
      }}
    />
  </Tab.Navigator>
);
export default MainTab;
