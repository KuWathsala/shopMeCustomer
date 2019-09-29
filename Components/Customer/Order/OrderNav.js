import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { createStackNavigator, createAppContainer } from  'react-navigation';
import CurrentOrdersComponent from './CurrentOrders';
import ProductDetailsComponent from '../Home/ProductDetails';
import RateComponent from './Rate';
import TrackComponent from './Track';

const stackNav = createStackNavigator({
  
  CurrentOrders: {
    screen: CurrentOrdersComponent,
    navigationOptions: ({navigation}) => ({
      title: "My Orders",
      headerTitleStyle: {
        color: "black"
      }
    })
  },

  ProductDetails: {
    screen: ProductDetailsComponent,
    navigationOptions: ({navigation}) => ({
      title: "Details",
      headerTitleStyle: {
        color: "black"
      }
    })     
  },
  
  Rate: {
    screen: RateComponent,navigationOptions: ({navigation}) => ({
      title: "Rate",
      headerTitleStyle: {
        color: "black"
      }
    }) 
  },  

  Track : {
    screen: TrackComponent,
    navigationOptions: ({navigation}) => ({
      title: "Track",
      headerTitleStyle: {
        color: "black"
      }
    }) 
  }
});
const Nav=createAppContainer(stackNav);
export default Nav;