import React, { Component ,useRef, useState,useEffect } from "react";
import {AuthContext} from '../../../../App';
import styles from "./style";
import {Keyboard, Text, View, TextInput, TouchableWithoutFeedback, KeyboardAvoidingView,Image} from 'react-native';
import Loader from '../../../components/Loader';
import isIOS from "../../../utils/isIOS";
import TouchAble from '../../../components/TouchAble';
import {loginApi} from '../../../api/AuthApi';
import firebase from 'react-native-firebase';
import AsyncStorage from "@react-native-community/async-storage";
import TermAndCondition from '../../../components/termAndCondition';
import NotificationPopup from 'react-native-push-notification-popup';
import Icon from 'react-native-vector-icons/FontAwesome5'
import Toast, {DURATION} from 'react-native-easy-toast'
import style from "./style";
const db = firebase.firestore();
const message = ({ appIconSource, appTitle, timeText, title, body, }) => (
  <View style={{backgroundColor:appTitle,marginTop:25,justifyContent:'center',alignItems:'center',marginLeft:'20%',marginRight:'20%',padding:5}}>
    <Text style={{color:'white',  textAlign:'center'}}>{title}</Text>
  </View>
);
const HomeScreen = ({navigation})=> {
    const [fname,setFname] = useState("");
    const [lname,setLname] = useState("");
    const [isValidated,setValidate] = useState(false)
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loader,setLoader] = useState(false);
    const fnameRef = useRef();
    const lnameRef = useRef();
    const emailRef = useRef();
    const passRef = useRef();
    const toastRef = useRef();
    const [validation,setValidation] = useState({fname:false,email:false,password:false})
     const { signIn } =  React.useContext(AuthContext);
    useEffect(() => {
        let temp = {
          fname:false,
          email:false,
          password:false
        };
       
        
        if(fname.length > 5) temp.fname = true;
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(re.test(email)) temp.email = true;
        if(password.length > 6) temp.password = true;
        
        if(temp.fname == true && temp.email == true && temp.password == true) setValidate(true);
          else setValidate(false);  
        setValidation(temp)
      //  // toastRef.current.show('hello world!');
    }, [fname,email,password]);
    
   signUp = async()=>{
        Keyboard.dismiss();
          setLoader(true)
          firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((userInfo) => {
            userInfo.user.updateProfile({ displayName: fname })
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
                toastRef.current.show('Бүртгэгдсэн хэрэглэгч байна');
          })
    
        
       // setLoader(false)
    }
    
    return (
      <KeyboardAvoidingView style={styles.containerView} behavior={ isIOS ? "padding  " : null }>
      {/* <NotificationPopup
            style={{alignItems:'center'}}
            ref={messageRef}
            renderPopupContent={message} 
      /> */}

      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    
       <View style={styles.signUpContainer}>
         <View style={styles.signUplogoContainer}>
            <Image source={require('../../../../asset/img/logo.png')} style={styles.signUpLogo} />
         </View>
        <View style={styles.signUpForm}> 
          <View style={styles.inputRow}>
            <Icon name='user-tie' size={20} color='black' />
            <TextInput ref={fnameRef}
              onChangeText={setFname} placeholder="Нэр" placeholderColor="#c4c3cb"  style={styles.loginFormTextInput} value={fname} />
            {
              validation.fname ?   <Icon name='check-circle' size={15} color='green'  style={styles.checkCircle}/> : null
            }
             
          </View>
          <View style={styles.divider}></View>
          <View style={styles.inputRow}>
            <Icon name='address-card' size={20} color='black' />
            <TextInput ref={emailRef}
              onChangeText={setEmail} placeholder="Имэйл хаяг" placeholderColor="#c4c3cb"  style={styles.loginFormTextInput} value={email} />
              {
                validation.email ? <Icon name='check-circle' size={15} color='green'  style={styles.checkCircle}/> : null
              }
              
          </View>
          <View style={styles.divider}></View>
          <View style={styles.inputRow}>
            <Icon name='lock' size={20} color='black' />
            <TextInput ref={passRef}
            secureTextEntry
            onChangeText={setPassword} placeholder="Нууц" placeholderColor="#c4c3cb"  style=      {styles.loginFormTextInput} value={password} />
            {
              validation.password ? <Icon name='check-circle' size={15} color='green'  style={styles.checkCircle}/> : null
            }
             
          </View>
        </View>
        {/* <TermAndCondition/> */}
        <TouchAble
                onPress={()=>signUp()}
                style={isValidated ?
                styles.activeRegister :
                styles.disableRegister}
                disabled={!isValidated}
        >
          <Text style={isValidated ? styles.activeRegisterText : styles.disableRegisterText }>
            Бүртгүүлэх
            </Text>
        </TouchAble>
        <Toast ref={toastRef} position='top' positionValue={10}
           style={{backgroundColor:'red'}}
        />
       </View> 
      </TouchableWithoutFeedback>
      
        {
          loader ? (<Loader />):null
        }
      
      </KeyboardAvoidingView>
    );
  }
  export default HomeScreen;

  


