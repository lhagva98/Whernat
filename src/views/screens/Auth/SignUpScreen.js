import React, { Component ,useRef } from "react";
import {AuthContext} from '../../../../App';
import styles from "./style";
import {Keyboard, Text, View, TextInput, TouchableWithoutFeedback, Alert, KeyboardAvoidingView, Button} from 'react-native';
import Loader from '../../../components/Loader';
import isIOS from "../../../utils/isIOS";
import TouchAble from '../../../components/TouchAble';
import {loginApi} from '../../../api/AuthApi';
import firebase from 'react-native-firebase';
import AsyncStorage from "@react-native-community/async-storage";
import NotificationPopup from 'react-native-push-notification-popup';
const db = firebase.firestore();
const message = ({ appIconSource, appTitle, timeText, title, body, }) => (
  <View style={{backgroundColor:appTitle,marginTop:25,justifyContent:'center',alignItems:'center',marginLeft:'20%',marginRight:'20%',padding:5}}>
    <Text style={{color:'white',  textAlign:'center'}}>{title}</Text>
  </View>
);
const HomeScreen = ({navigation})=> {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const inputUserName = useRef();
    const inputPassword = useRef();
    const messageRef = useRef();
    const [loader,setLoader] = React.useState(false);
    const { signIn } =  React.useContext(AuthContext);
    validateForm = ()=>{
      console.log(username,password);
      if(username.length == 0){
        messageRef.current.show({
          onPress: function() {console.log('Pressed')},
          appTitle: '#ff1a1a',
          timeText: 'Now',
          title: 'Нэвтрэх нэрээ оруулна уу',
          body: 'This is a sample message.\nTesting emoji 😀',
          color:'white',
          slideOutTime: 2500
        });
        inputUserName.current.focus();
        return false;
      }
       if(password.length === 0){
        messageRef.current.show({
          onPress: function() {console.log('Pressed')},
          appTitle: '#ff1a1a',
          timeText: 'Now',
          title: ' Нууц үгээ оруулна уу',
          body: 'This is a sample message.\nTesting emoji 😀',
          color:'white',
          slideOutTime: 2500
        });
        inputPassword.current.focus();
        return false;
      }
        return true
     
    }
    signUp = async()=>{
        Keyboard.dismiss();
        const flag = validateForm();
        if(flag === true) {
          setLoader(true)
          firebase.auth().createUserWithEmailAndPassword(username, password)
            .then((userInfo) => {
            userInfo.user.updateProfile({ displayName: "lhagvaDorj" })
            db.collection('users').doc(userInfo.user.uid).set({
                interested: [],
                categories: [],
            })
            .then(() => {   
                    AsyncStorage.setItem('userToken',userInfo.user.uid);
                    signIn();
                    alert("Амжилттай бүртгэгдлээ");
                })    
            })
            .catch((error)=>{
                setLoader(false);
                messageRef.current.show({
                onPress: function() {console.log('Pressed')},
                appTitle: '#ff1a1a',
                timeText: 'Now',
                title: 'Бүртгэгдсэн хэрэглэгч байна',
                body: 'This is a sample message.\nTesting emoji 😀',
                color:'white',
                slideOutTime: 2500
                });
           // alert("aaa")
          })
        }
        
       // setLoader(false)
    }
    return (
      <KeyboardAvoidingView style={styles.containerView} behavior={ isIOS ? "padding  " : null }>
      <NotificationPopup
            style={{alignItems:'center'}}
            ref={messageRef}
            renderPopupContent={message} 
      />

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.loginScreenContainer}>
              <View style={styles.loginFormView}>
              <Text style={styles.logoText}>Whernat</Text>
                <TextInput ref={inputUserName} onChangeText={setUsername} placeholder="Нэвтрэх нэр" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} value={username} />
                <TextInput ref={inputPassword} onChangeText={setPassword} placeholder="Нууц үг" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} secureTextEntry value={password}/>
                <TouchAble
                  style={styles.loginButton}
                  onPress={signUp}
                >
                    <Text style={styles.loginButtonText}>Бүртгүүлэх</Text>
                </TouchAble>
                
                <View >
                </View> 
              </View>
             

        </View>
      </TouchableWithoutFeedback>
      
        {
          loader ? (<Loader />):null
        }
      
      </KeyboardAvoidingView>
    );
  }
  export default HomeScreen;

  


