import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { createStackNavigator, createAppContainer } from  'react-navigation';
import {HomeHeader, ProductDetails, BuyIt, Locaton, ShopsList ,Shops, Products, SearchPlace, } from '../../Menu/screenNames';
import ProductsComponent from './Products';
import ProductDetailsComponent from './ProductDetails';
import BuyItComponent from './BuyIt';
import LocatonComponent from '../../Customer/Home/Location';
import ShopsComponent from './Shops';
import SearchPlaceComponent from '../../Map/SearchPlace';
import SignInComponent from '../../SignIn/SignIn';

const stackNav = createStackNavigator({
  /*
  SignIn: {
    screen: SignInComponent
  },
  */
  SearchPlace: {
    screen: SearchPlaceComponent
  },
  Shops: {
    screen: ShopsComponent
  },
  Products: {
    screen: ProductsComponent,
    navigationOptions: ({navigation}) => ({
      //title: "Products by Shop",
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
  BuyIt: {
    screen: BuyItComponent,
    navigationOptions: ({navigation}) => ({
      title: "Buy",
      headerTitleStyle: {
        color: "black"
      }
    })  
  },

});
const HomeNav=createAppContainer(stackNav);
export default HomeNav;