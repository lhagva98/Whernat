import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Text,TouchableWithoutFeedback,View} from 'react-native';

const SearchInput = (props)=>{
    return(
        <TouchableWithoutFeedback onPress={props.onPress}>
            <View style={{width:'80%',height:40,padding:10,flexDirection:'row',backgroundColor:'white',} }>
                <Icon name="search" color={'#cccccc'} size={20} /> 
                <Text style={{opacity:0.8,marginLeft:10,fontSize:17}}>Search for events ...</Text>
            </View>
        </TouchableWithoutFeedback>
    )

}

export default SearchInput;