import React from 'react';
import {View,Text} from 'react-native';
import TouchAble from '../TouchAble';
const ControlTab = ({isActive,onPress})=>{
    return(
        <View style={{width:'100%',flexDirection:'row',height:40,backgroundColor:'whie',padding:5}}>
           <TouchAble style={{flex:1,justifyContent:'center',alignItems:'center'}} onPress={()=>onPress(1)}
           >
               {
                   isActive == 1 ? (<Text style={{fontSize:17,color:'orange'}} >Featured</Text>):(<Text style={{fontSize:15}} >Featured</Text>)
               }
               
           </TouchAble>
           <View style={{height:25,width:2,backgroundColor:'black'}}></View>
           <TouchAble style={{flex:1,justifyContent:'center',alignItems:'center'}} onPress={()=>onPress(2)}>
           {
                   isActive == 2 ? (<Text style={{fontSize:17,color:'orange'}} >My Events</Text>):(<Text style={{fontSize:15}} >My Events</Text>)
               }
               
           </TouchAble>
        </View>
    )
}

export default ControlTab;