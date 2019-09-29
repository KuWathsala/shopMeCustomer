import React, {Component} from 'react';
import {
    Text, View, StyleSheet, Image, ScrollView, Dimensions, Alert, Platform, TouchableOpacity
} from 'react-native';
import {ProductDetailData} from './Data';
import Icon from 'react-native-vector-icons/Ionicons';
import Button from 'react-native-button';
import CartItems from '../Cart/CartItems';

export default class BuyIt extends Component {

    constructor(props){
        super(props);
        this.state={
            product: {
                id:  this.props.navigation.getParam('id', '-'),
                selectedQuantity: this.props.navigation.getParam('selectedQuantity', '-'),
            }
        }
    }

    render () {
    return (
        <CartItems />
    );
  }
}
const widthScreen=Dimensions.get('window').width;
const heightScreen=Dimensions.get('window').height;

const styles = StyleSheet.create({  
    container: { 
        flex: 1,
        flexDirection:'column',
        marginTop: Platform.OS==='ios' ? 34 : 0,
    },
});