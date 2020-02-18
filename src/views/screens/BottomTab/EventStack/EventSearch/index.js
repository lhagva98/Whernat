import React from 'react';
import Modal from 'react-native-modal';
import {Button,View,TextInput} from 'react-native';
import styles from './style';
import SearchBar from './SearchBar'
const EventSearch = ({isvisible,close})=>{
  return(
    <Modal
      animationType="slide"
      transparent={false}
      visible={isvisible}
      style={
        {
          margin: 0, // This is the important style you need to set
          
        }
      }
     >
       <SearchBar close={close}/>
       <View style={{width:'100%',height:0.5,backgroundColor:'black'}}>
        </View>
       <View style={{flex:1}}>

       </View>
     
    </Modal>
  )
}
export default EventSearch;