import React, {Component} from 'react';
import {Text, View, StyleSheet, Image, Dimensions, ScrollView, TouchableOpacity, Modal} from 'react-native';
import {Rating} from 'react-native-ratings';
import {} from '../../Menu/screenNames';
import axios from 'axios';
import { baseURL } from '../../Base';

export default class Rate extends Component {

    constructor(props){
        super(props)
        this.state={
          orderId: parseInt(this.props.navigation.getParam('id', '-')),
          shopRate: 0,
          delivererRate: 0
        }
    } 

    click=()=>{
      axios.get(`${baseURL}/api/orders/updateOrderStatus/${this.state.orderId},${"confirm order recieved"}`) 
      .then(
        response=>{
          console.log(response)
          axios.post(`${baseURL}}/api/orders/rate/${this.state.orderId},${this.state.shopRate},${this.state.delivererRate}`) 
          .then(
            res=>{
              console.log(res)
              this.props.navigation.navigate('CurrentOrders')
            }
          )
        }
        
      )
    }

    render () {
    return ( 
      <View style={styles.container}>
        <Text style={styles.text1} >Rate the shop</Text>
        <Rating 
            showRating
            onFinishRating={(rating)=>{this.setState({shopRate: rating})}}
            style={{ paddingVertical: 10 }}
        />
        <Text style={styles.text2} >Rate the deliverer</Text>
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
  text1:{
    fontSize: 25,
    color: 'black',
    textAlign:'center',
    marginTop:  0
  },
  text2:{
    fontSize: 25,
    color: 'black',
    textAlign:'center',
    marginTop:  50
  },
  ok:{
    marginTop: 5,
    fontSize: 25,
    color: 'white',
    alignItems:'center',
  },
})
