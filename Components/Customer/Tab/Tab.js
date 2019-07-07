import React, { Component } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { TabNavigator, createAppContainer, createBottomTabNavigator } from 'react-navigation';
import { Home, Search, Order, Profile} from '../../Menu/screenNames';
import HomeComponent from '../Home/Home';
import SearchComponent from '../Search/Search';
import OrderComponent from '../Order/Order';
import ProfileComponent from '../Profile/Profile';
import CartComponent from '../Cart/Cart';
import Icon from "react-native-vector-icons/Ionicons";

let routeConfigs={
    Home: {
        screen: HomeComponent,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
              <Icon name='md-home' size={37} color={tintColor} />
              )
        }
    },
    Search: {
        screen: SearchComponent,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
              <Icon name='md-search' size={37} color={tintColor} />
              )
        }
    },
    Cart: {
        screen: CartComponent,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
              <Icon name='md-cart' size={37} color={tintColor} />
              )
        }
    },
    Profile: {
        screen: ProfileComponent,
        navigationOptions: {
            tabBarIcon: ({ tintColor }) => (
              <Icon name='md-person' size={37} color={tintColor} />
              )
        }
    }
}; 
let tabNavigatorConfig={
    tabBarOptions: {
        keyboardHidesTabBar: true,
        activeTintColor: '#593196',
        inactiveTintColor: 'gray',
        style: {
            backgroundColor: 'darkcerulean',
        },
        backgroundColor: 'black',
        tabBarPosition: 'bottom',
        animationEnabled: true,
        swipeEnabled: true,
        showLabel: false
    },
};

const tabNavigator=createBottomTabNavigator(routeConfigs, tabNavigatorConfig);
const Tab=createAppContainer(tabNavigator);
export default Tab;
 
