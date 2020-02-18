import React from 'react';
import EventMainScreen from './EventMainScreen';
import EventDetails from './EventDetails/index';
import RegisterEvent from './RegisterEvent';
import { createStackNavigator } from '@react-navigation/stack';
import Map from '../../../../components/eventMap';
const Stack = createStackNavigator();
const EventSack = ()=>(
    <Stack.Navigator  >
        <Stack.Screen name="EventMain" component={EventMainScreen} />
        <Stack.Screen name="EventDetails" component={EventDetails} />
        <Stack.Screen name="Map" component={Map}/>
        <Stack.Screen name='RegisterEvent' component={RegisterEvent}/>
  </Stack.Navigator>
)
export default EventSack;