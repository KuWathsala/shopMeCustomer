import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import { createStackNavigator, createAppContainer } from  'react-navigation';
import ProfileHeaderComponent from './ProfileHeader';
import EditProfileComponent from './EditProfile';

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
  EditProfile: {
    screen: EditProfileComponent,
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