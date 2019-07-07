import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { createStackNavigator, createAppContainer } from  'react-navigation';
import {HomeHeader, ProductDetails, BuyIt, Locaton } from '../../Menu/screenNames';
import HomeHeaderComponent from './HomeHeader';
import ProductDetailsComponent from './ProductDetails';
import BuyItComponent from './BuyIt';
import LocatonComponent from '../../Customer/Home/Location';

const stackNav = createStackNavigator({
  
  HomeHeader: {
    screen: HomeHeaderComponent
  },
  Locaton: {
    screen: LocatonComponent
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
const HomeNav=createAppContainer(stackNav);
export default HomeNav;