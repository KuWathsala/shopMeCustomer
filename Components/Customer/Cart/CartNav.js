import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { createStackNavigator, createAppContainer } from  'react-navigation';
import { BuyIt, Cart } from '../../Menu/screenNames';
import BuyItComponent from '../Home/BuyIt';
import CartItemsComponent from './CartItems';

const stackNav = createStackNavigator({

    CartItems: {
        screen: CartItemsComponent
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