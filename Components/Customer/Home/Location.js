import React, {Component} from 'react';
import {Text, View, StyleSheet, Image, ScrollView, Dimensions,} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import Map from '../../Map/Map';
import {Shops} from '../../Menu/screenNames';

export default class Location extends Component {
  static navigationOptions = { header: null };

  render () {
    return (
      <View style={styles.container}>

        <Map />

        <View style={styles.icon}>
          <Icon style={{marginBottom: 20, marginRight: 20}} name="ios-checkmark-circle-outline" size={60} color="#593196" 
              onPress={() => this.props.navigation.navigate(Shops)}   
          />
        </View> 

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',

  },
  icon: {
    position: 'absolute',
    bottom: 0,
    alignSelf: 'flex-end'
  },
  button:{
    marginBottom: 20,
    padding: 10,
    height:40,
    backgroundColor: 'black',
    fontSize: 18,
    color: 'white'
},
});

