import React, { Component ,useRef ,useEffect} from "react";
import {AuthContext} from '../../../../App';
import styles from "./style";
import {Animated,ImageBackground,Image,Text, Keyboard,View, TextInput, TouchableWithoutFeedback, Alert, KeyboardAvoidingView, Button} from 'react-native';
import Loader from '../../../components/Loader';
import isIOS from "../../../utils/isIOS";
import TouchAble from '../../../components/TouchAble';
import {loginApi} from '../../../api/AuthApi';
import firebase from 'react-native-firebase';
import * as Animatable from 'react-native-animatable';
import AsyncStorage from "@react-native-community/async-storage";
import NotificationPopup from 'react-native-push-notification-popup';

const message = ({ appIconSource, appTitle, timeText, title, body, }) => (
  <View style={{backgroundColor:appTitle,marginTop:25,justifyContent:'center',alignItems:'center',marginLeft:'20%',marginRight:'20%',padding:5}}>
    <Text style={{color:'white',  textAlign:'center'}}>{title}</Text>
  </View>
);

const LoginScreen = ({navigation})=> {
    const [isKeyboardVisible, setKeyboardVisible] = React.useState(false);
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const inputUserName = useRef();
    const inputPassword = useRef();
    const messageRef = useRef();
    const logoRef = useRef();
    const [loader,setLoader] = React.useState(false);
    const { signIn } =  React.useContext(AuthContext);
    const logoHeight = new Animated.Value(64);
    const logoY = new Animated.Value(0);
    const logoTransY = logoY.interpolate({
      inputRange: [0, 1],
      outputRange: [0, -20]
    });
   
    React.useEffect(() => {
      const keyboardDidShowListener = Keyboard.addListener(
        'keyboardWillShow',
        () => {
          setKeyboardVisible(true); // or some other action
        }
      );
      const keyboardDidHideListener = Keyboard.addListener(
        'keyboardWillHide',
        () => {
          setKeyboardVisible(false); // or some other action
        }
      );
  
      return () => {
        keyboardDidHideListener.remove();
        keyboardDidShowListener.remove();
      };
    }, []);
    React.useEffect(() => {
      Animated.parallel([
        
        Animated.timing(logoHeight, {
          toValue: isKeyboardVisible ? 32:64,
          duration: 500,
        }),

      ])
      .start();
      
    }, [isKeyboardVisible]);
    
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
    
    login = async()=>{
        Keyboard.dismiss();
        const flag = this.validateForm();
        if(flag === true) {
          setLoader(true)
          firebase.auth().signInWithEmailAndPassword(username, password)
          .then(data=>{
         //   console.log(data.user.uid);
            AsyncStorage.setItem('userToken',data.user.uid);
            signIn();
          })
          .catch((error)=>{
            setLoader(false);
            messageRef.current.show({
              onPress: function() {console.log('Pressed')},
              appTitle: '#ff1a1a',
              timeText: 'Now',
              title: 'Нэвтрэх нэр эсвэл нууц үг буруу байна',
              body: 'This is a sample message.\nTesting emoji 😀',
              color:'white',
              slideOutTime: 2500
            });
           // alert("aaa")
          })
        }
        
       // setLoader(false)
    }
    const zoomOut = {
      0: {
        opacity: 0,
        scale: 0,
      },
      0.5: {
        opacity: 0.5,
        scale: 0.3,
      },
      1: {
        opacity: 1,
        scale: 1,
      },
    };
    
    return (
      <KeyboardAvoidingView style={styles.containerView} behavior={ isIOS ? "padding" : null }>
      <NotificationPopup
            style={{alignItems:'center'}}
            ref={messageRef}
            renderPopupContent={message} 
      />
      <TouchableWithoutFeedback 
        onPress={Keyboard.dismiss}
      >
        <View style={styles.loginScreenContainer}>
              <View style={styles.logoContainer}
              >
                 <Animatable.Image animation={zoomOut} source={require('../../../../asset/img/logo.png')} style={styles.logo}/>
                <View style={{flexDirection:'row',paddingHorizontal:0}}>
                <View style={{borderWidth:2,borderColor:'white',height:50,padding:10,margin:5,borderRightWidth:0}}>
                    <Animatable.Text  duration={2000}  iterationCount="infinite"  animation='bounceIn' style={styles.logoText}>WHERE</Animatable.Text>
                  </View>
                  <View style={{borderWidth:2,borderColor:'white',height:50,padding:10,margin:5,borderRightWidth:0,borderLeftWidth:0}}>
                    <Animatable.Text   duration={2000}  iterationCount="infinite"  delay={200} animation='bounceInDown' style={styles.logoText}>WHEN</Animatable.Text>
                  </View>
                  <View style={{borderWidth:2,borderColor:'white',height:50,padding:10,margin:5,borderLeftWidth:0}}>
                  <Animatable.Text  duration={2000}   iterationCount="infinite" delay={400} animation='bounceInRight' style={styles.logoText}>WHAT</Animatable.Text>
                  </View>
                  </View>
              </View> 
              <View style={styles.loginFormContainer}>
                <View style={styles.loginForm}> 
                  <TextInput ref={inputUserName} onChangeText={setUsername} placeholder="Нэвтрэх нэр" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} value={username} />
                  <View style={styles.divider}></View>
                  <TextInput ref={inputPassword} onChangeText={setPassword} placeholder="Нууц үг" placeholderColor="#c4c3cb" style={styles.loginFormTextInput} secureTextEntry value={password}/>
                </View>
                <TouchAble
                  style={styles.loginButton}
                  onPress={login}
                >
                    <Text style={styles.loginButtonText}>Нэвтрэх</Text>
                </TouchAble>
              </View>
              <View style={styles.bottomSection}
              >
                <TouchAble
                    style={styles.forgetPassword}
                    onPress={login}
                  >
                    <Text style={styles.forgetPasswordText}>Нууц үг сэргээх</Text>
                  </TouchAble>
                <TouchAble
                    style={styles.registerAccount}
                    onPress={()=>navigation.navigate('SignUp')}
                  >
                    <Text style={styles.registerText}>Бүртгүүлэх</Text>
                  </TouchAble>
              </View>
        </View>
      </TouchableWithoutFeedback>
      
        {
          loader ? (<Loader />):null
        }
      
      </KeyboardAvoidingView>
    );
  }
  export default LoginScreen;

  


