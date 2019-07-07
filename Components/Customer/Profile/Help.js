import React, {Component} from 'react';
import {Text,View,StyleSheet,Button,Image} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";

export default class Account extends Component {
    render () {
    return (
        <View style={styles.container} > 
            <Text>Help</Text>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  icon: {
    width: 40,
    height:40,
    tintColor: 'red'
  }
});