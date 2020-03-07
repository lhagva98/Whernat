import React from 'react';
import {View,Text} from 'react-native';
import TouchAble from '../../../../../components/TouchAble';
import { StackActions } from '@react-navigation/native';
const JoinUs = ({navigation,eventId})=>{

    return(
        <TouchAble onPress={()=>
            navigation.dispatch(
             StackActions.replace('RegisterEvent', {
             eventId: eventId,
          }))
        } style={{margin:20,backgroundColor:'orange',height:40,borderRadius:10,justifyContent:'center',alignItems:'center'}} >
                <Text style={{color:'white',fontSize:18,fontWeight:'bold'}}>interested</Text>
        </TouchAble>
    )
}
export default JoinUs;