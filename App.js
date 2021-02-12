import React,{Component} from 'react';
import CustomerTab from './Components/Customer/Tab/Tab';
import {  View, Text, Dimensions, Image, StyleSheet, TextInput, ActivityIndicator } from "react-native";
import Map from './Components/Map/Map';
import SearchPlace from './Components/Map/SearchPlace';
import {Provider} from 'react-redux';
import store from './Components/Customer/Redux/Store/store';
import Location from './Components/Map/Locations';
import SignIn from './Components/SignIn/SignIn';
import FIRSignin from './Components/SignIn/FirebaseSignin.js';
import FIRPhoneSignin from './Components/SignIn/PhoneSignin.js';

export default class App extends React.Component{

  render(){
    return (
      <Provider store={store}>
        <FIRSignin />
      </Provider>
    );
  }
}
