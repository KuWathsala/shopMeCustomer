import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { createStackNavigator, createAppContainer } from  'react-navigation';
import ProfileHeaderComponent from './ProfileHeader';
import SettingsComponent from './Settings';
import HelpComponent from './Help';
import OrdersComponent from './Orders';
import AccountComponent from './Account';

const stackNav = createStackNavigator({
  ProfileHeader: {
    screen: ProfileHeaderComponent,
    navigationOptions: ({navigation}) => ({
      header: null ,
      headerTitleStyle: {
        color: "black"
      }
    })     
  },
  Account: {
    screen: AccountComponent,
    navigationOptions: ({navigation}) => ({
      header: null,
      headerTitleStyle: {
        color: "black"
      }
    })     
  },
});
const ProdileNav=createAppContainer(stackNav);
export default ProdileNav;