import React from 'react';
import {View,Text,Image} from 'react-native';
import TouchAble from '../TouchAble';
import styles from './style';
import Icon from 'react-native-vector-icons/FontAwesome';


const Event = ({data,navigation})=>{
    return(
         <TouchAble style={styles.EventContainer} onPress={()=>navigation.navigate('EventDetails',{data:data,})}>
            <Image style={styles.EventImage} source={require('../../../asset/img/event.jpeg')}/>
            <View style={styles.footerContainer}>
                <Text style={styles.time}>2015-12-14 бямба гаригт</Text>
                <Text style={styles.name}>{data.name}</Text>
                <View style={styles.location}>
                    <Icon name='map-pin ' size={15} color='black'/>
                    <Text style={styles.locationText}>{data.location}</Text>
                </View>
                
            </View>
            </TouchAble>
     
    )
}

export default Event;