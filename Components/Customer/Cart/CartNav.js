import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { createStackNavigator, createAppContainer } from  'react-navigation';
import { BuyIt, Cart, Payment } from '../../Menu/screenNames';
import BuyItComponent from '../Home/BuyIt';
import CartItemsComponent from './CartItems';
import PaymentComponent from './Payment';

const stackNav = createStackNavigator({

    CartItems: {
        screen: CartItemsComponent,
        navigationOptions: ({navigation}) => ({
            title: "My Cart",
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
    Payment: {
        screen: PaymentComponent,
    }

});
const HomeNav=createAppContainer(stackNav);
export default HomeNav;