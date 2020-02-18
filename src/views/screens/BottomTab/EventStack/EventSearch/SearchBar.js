import React from 'react';
import {View,Text,TextInput} from 'react-native';
import styles from './style'
import Icon from 'react-native-vector-icons/FontAwesome5';
import TouchAble from '../../../../../components/TouchAble';
const SearchBar = ({close})=>{
    const InputRef = React.useRef();
    React.useEffect(()=>{
        InputRef.current.focus();
    })
    return(
        <View style={styles.SearchBarContainer}>
            <TouchAble onPress={()=>{close()}}>
                <Icon name='chevron-left' size={20} color='orange'/>
            </TouchAble>
            <View style={{height:40,backgroundColor:'#cccccc',marginLeft:15,borderRadius:25,width:'90%',justifyContent:'center',alignItems:'center',flexDirection:'row'}}>
                 <Icon name='search' size={20} color='white'/>
                <TextInput  onSubmitEditing={()=>alert("loading")} ref={InputRef}  returnKeyType='search' placeholder='Search for Events'  style={{width:'90%',padding:5,paddingLeft:15}}/>
            </View>
        </View>
    )
}
export default SearchBar;