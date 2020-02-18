import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import EventStack from './EventStack';
import MyEventStack from './MyEventStack';
import Icon from 'react-native-vector-icons/FontAwesome';
const Tab = createBottomTabNavigator();
const MainTab = ()=> (
    <Tab.Navigator
      tabBarOptions={{
        labelPosition:'below-icon',
        activeTintColor: 'green',
       // inactiveTintColor:'black',
        labelStyle:{
            fontSize:20,
            color:'black'
        },
      }}
    >
        <Tab.Screen name="EventStack" component={EventStack}
          options={{
            tabBarLabel: 'Events',
            tabBarIcon: ({ color, size }) => (
              <Icon name="bell" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen name="MyEventStack" component={MyEventStack} 
          options={{
            tabBarLabel: 'My Events',
            tabBarIcon: ({ color, size }) => (
              <Icon name="bell" color={color} size={size} />
            ),
          }}
        />
  </Tab.Navigator>
)
export default MainTab;