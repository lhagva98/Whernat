import React, { Component } from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
} from 'react-native'
const Loader = ()=>(
    <View style={{position:'absolute',top:0,left:0,right:0,bottom:0,justifyContent:'center',alignItems:'center',zIndex:999,backgroundColor:'rgba(1, 1, 1, 0.2)'}}>
      <ActivityIndicator size="large" color="red"/>
    </View>
);
export default Loader;