import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { createStackNavigator, createAppContainer } from  'react-navigation';
import CurrentOrdersComponent from './CurrentOrders';
import ProductDetailsComponent from '../Home/ProductDetails';
import BuyItComponent from '../Home/BuyIt';

const stackNav = createStackNavigator({
  
  CurrentOrders: {
    screen: CurrentOrdersComponent,
  },

  ProductDetails: {
    screen: ProductDetailsComponent,
    navigationOptions: ({navigation}) => ({
      title: "Details",
      headerTitleStyle: {
        color: "#593196"
      }
    })     
  },
  
  BuyIt: {
    screen: BuyItComponent,
    navigationOptions: ({navigation}) => ({
      title: "Buy",
      headerTitleStyle: {
        color: "#593196"
      }
    })  
  },  
});
const Nav=createAppContainer(stackNav);
export default Nav;