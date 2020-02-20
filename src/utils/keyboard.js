import {Keyboard,View} from 'react-native';
import React from 'react';
export default function KeyboardEvent(_keyboardDidShow,_keyboardDidHide){
    this.keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      _keyboardDidShow,
    );
    this.keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      _keyboardDidHide,
    );
}