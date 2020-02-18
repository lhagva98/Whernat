import React from 'react';
import {View,Text,ScrollView} from 'react-native';
import styles from './style';
import EventImage from './EventImage';
import BannerInfo from './bannerInfo';
import DetailMap from './DetailMap';
import OverView from './OverView';
import JoinUs from './JoinUs';
const EventDetails = ({navigation,route})=>{
    return(
        <ScrollView style={styles.container}>
           <EventImage isInterested={true} source={""}/>
           <View style={{padding:10}}>
                <BannerInfo/>
                <DetailMap navigation={navigation}/>
           </View>  
            <JoinUs navigation={navigation} eventId={"F3jiX6uMASzyCXLLVY69"}/>
            <OverView/>
        </ScrollView>
    )
}

export default EventDetails;