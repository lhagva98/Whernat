import React from 'react';
import {View,Text} from 'react-native';  
import styles from './style';
import SearchInput from '../../../../components/SearchInput';
import EventsTab from './EventMainTab';
import EventSearch from './EventSearch';
const EventMainScreen = ({navigation})=>{
    const [searchInput,setSearchInput] = React.useState(false);
    return(
        <View style={styles.containerView}> 
            <View style={styles.searchContainer}>
                <Text style={styles.searchText}>Looking for an event?</Text>
                <SearchInput onPress={()=>{setSearchInput(true)}}/>
            </View>
            <EventsTab />
            <EventSearch isvisible={searchInput} close={()=>setSearchInput(false)}/>
        </View>
    );
}
    

export default EventMainScreen;