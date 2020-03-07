import React from 'react';
import {View,Text   , Image} from 'react-native';
import styles from './style';
const BannerInfo = ({imageSource,name,date})=>{
    return(
     <View style={styles.BannerInfoContainer}>
         <Image source={require('../../../../../../asset/img/event.jpeg')} style={styles.bannerImage}/>
         <View style={styles.bannerInfo}>
            <Text style={styles.bannerName}>Socia Conference</Text>
            <Text style={styles.bannerTime}>2020-05-12 12AM</Text>
         </View>
     </View>
    )
}

export default BannerInfo;