import React from 'react';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import FeaturedEvents from './FeaturedEvents';
import InterestedEvents from './InterestedEvents';
const Tab = createMaterialTopTabNavigator();

const Events = ()=> {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Featured" component={FeaturedEvents} />
      <Tab.Screen name="Interested" component={InterestedEvents} />
    </Tab.Navigator>
  );
}

export default Events;