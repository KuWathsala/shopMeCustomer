import React, {Component} from 'react';
import {Text,View,StyleSheet,Button,Image, TextInput} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import CartNav from './CartNav';

export default class Cart extends Component {

    render () {
      return (
        <CartNav />
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    width: 27,
    height:27,
    tintColor: 'red'
  }
});