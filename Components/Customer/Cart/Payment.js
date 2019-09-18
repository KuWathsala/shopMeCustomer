import React, { Component } from 'react';
import { Platform, StyleSheet, Text, } from 'react-native';
import {WebView} from 'react-native-webview';

export default class Payment extends Component{

    componentDidMount(){
    }

    constructor(props){
        super(props);
    }

    render(){
        return(
        <WebView
            source={{uri: url, method: 'POST' }}
        />
    );
    }
}

//const source='<!DOCTYPE html><html><body><form method="post" action="https://sandbox.payhere.lk/pay/checkout"><input type="hidden" name="merchant_id" value="1213071"><input type="hidden" name="return_url" value="http://sample.com/return"><input type="hidden" name="cancel_url" value="http://sample.com/cancel"><input type="hidden" name="notify_url" value="https://backend-webapi20190825122524dbserver.database.windows.net/">  <br><br>Item Details<br><input type="text" name="order_id" value="ItemNo12345"><input type="text" name="items" value="Door bell wireless"><br><input type="text" name="currency" value="LKR"><input type="text" name="amount" value="1000">  <br><br>Customer Details<br><input type="text" name="first_name" value="Saman"><input type="text" name="last_name" value="Perera"><br><input type="text" name="email" value="samanp@gmail.com"><input type="text" name="phone" value="0771234567"><br><input type="text" name="address" value="No.1, Galle Road"><input type="text" name="city" value="Colombo"><input type="hidden" name="country" value="Sri Lanka"><br><br> <input type="submit" value="Buy Now">   </form> </body></html>'
const url = 'https://sandbox.payhere.lk/pay/checkout?merchant_id=1213071&return_url=&cancel_url=&order_id=&items=&currency=LKR&amount=1800&first_name=kumuthu&last_name=wathsala&email=wathdanthasinghe@gmail.com&phone=&address=&city=&country=&notify_url=https://backend-webapi20190825122524.azurewebsites.net/api/orders/payment?id=13&price=1800'

//4916217501611292