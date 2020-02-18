import React from 'react';
import SignUpScreen from './SignUpScreen';
import LoginScreen from './LoginScreen';
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

const AuthStack = ()=>(
    <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen}  
           options={{
            headerStyle:{height:0}
          }}
        />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
  </Stack.Navigator>
)
export default AuthStack;