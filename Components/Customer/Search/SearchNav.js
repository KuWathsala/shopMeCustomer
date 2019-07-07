import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { createStackNavigator, createAppContainer } from  'react-navigation';
import SearchHeaderComponent from './SearchHeader';
import SearchItemsComponent from './SearchItems';
import ProductDetailsComponent from '../Home/ProductDetails';
import BuyItComponent from '../Home/BuyIt';
import MapComponent from '../../Map/Map';

const stackNav = createStackNavigator({
  
  SearchHeader: {
    screen: SearchHeaderComponent,
  },
  
  SearchItems: {
    screen: SearchItemsComponent,
    navigationOptions: ({navigation}) => ({
      title: "Search Results",
      headerTitleStyle: {
        color: "#593196"
      }
    })     
  },
  Map: {
    screen: MapComponent,
    navigationOptions: ({navigation}) => ({
      title: "My Location",
      headerTitleStyle: {
        color: "#593196"
      }
    })     
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