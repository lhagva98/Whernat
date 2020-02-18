import React from 'react';
import {View,Text,ImageBackground} from 'react-native';
import styles from './style';
const EventImage = ({isActive,source})=>{
    return(
      <ImageBackground source={require('../../../../../../asset/img/event.jpeg')} style={styles.EventImage}>
      </ImageBackground>
    )
}

export default EventImage;