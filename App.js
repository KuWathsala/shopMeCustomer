import React,{Component} from 'react';
import Tab from './Components/Customer/Tab/Tab';
import axios from 'axios';
import {  View, Text, Dimensions, Image, StyleSheet, TextInput, Button } from "react-native";
import Map from './Components/Map/Map';
import SearchPlace from './Components/Map/SearchPlace';
import RNFS from 'react-native-fs';
import {Provider} from 'react-redux';
import store from './Components/Customer/Redux/Store/store';

export default class App extends React.Component{

  render(){
    return (
      <Provider store={store}>
        <Tab />
      </Provider>
    );
  }
}



/*
import RNFS from 'react-native-fs';

RNFS.readFile(this.state.imagePath, 'base64')
.then(res =>{
  console.log(res);
});
*/