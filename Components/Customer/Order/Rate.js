import React, {Component} from 'react';
import {Text, View, StyleSheet, Image, Dimensions, ScrollView, TouchableOpacity, Modal} from 'react-native';
import {Rating} from 'react-native-ratings';
import {} from '../../Menu/screenNames';
import axios from 'axios';

export default class Rate extends Component {

    constructor(props){
        super(props)
        this.state={
          orderId: this.props.navigation.getParam('id', '-'),
          shopRate: 0,
          delivererRate: 0
        }
    } 

    click=()=>{
      axios.post(`https://backend-webapi20190825122524.azurewebsites.net/api/orders/rate/${this.state.orderId},${this.state.shopRate},${this.state.delivererRate}`) 
      .then(this.props.navigation.navigate('CurrentOrders'))
    }

    render () {
    return ( 
      <View style={styles.container}>
        <Text style={styles.text} >Rate the shop</Text>
        <Rating 
            showRating
            onFinishRating={(rating)=>{this.setState({shopRate: rating})}}
            style={{ paddingVertical: 10 }}
        />
        <Text style={styles.text} >Rate the deliverer</Text>
        <Rating 
            showRating
            onFinishRating={(rating)=>{this.setState({delivererRate: rating})}}
            style={{ paddingVertical: 10 }}
        />
        <TouchableOpacity style={styles.button}
            onPress={this.click}>
            <Text style={styles.ok} >Ok</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const widthScreen=Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    justifyContent: 'center',
    color:'white'
  },
  button: {
    alignSelf:'center',       
    width: widthScreen,
    height: 45,
    fontSize: 25,
    backgroundColor: 'black',
    color: 'white',
    alignItems: 'center',
    bottom: 0,
    position: 'absolute',
  },
  text:{
    fontSize: 25,
    color: 'black',
    textAlign:'center',
  },
  ok:{
    marginTop: 5,
    fontSize: 25,
    color: 'white',
    alignItems:'center',
  },
})
