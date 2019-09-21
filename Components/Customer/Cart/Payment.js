import React, { Component } from 'react';
import { Platform, StyleSheet, Text, Modal, View, TouchableOpacity} from 'react-native';
import {WebView} from 'react-native-webview';
import {Order} from '../../Menu/screenNames';

export default class Payment extends Component{
    
    constructor(props){
        super(props);
    }

    onNavigationStateChange (webViewState) {
        console.log(webViewState.url==='https://www.google.lk?order_id=12')
        if(webViewState.url==='https://www.google.lk?order_id=12'){
            this.props.navigation.navigate(Order)
            console.log("Order=>")
        }
    }

    render(){
        return(
        <WebView
            source={{uri: url, method: 'POST' }}
            onNavigationStateChange={this.onNavigationStateChange.bind(this)}
        />
    );
    }
}
const url = 'https://sandbox.payhere.lk/pay/checkout?merchant_id=1213071&return_url=https://www.google.lk&cancel_url=https://www.bing.lk&order_id=12&items=&currency=LKR&amount=50&first_name=kumuthu&last_name=wathsala&email=wathdanthasinghe@gmail.com&phone=&address=&city=&country=&notify_url=https://backend-webapi20190825122524.azurewebsites.net/api/payments/update'

//4916217501611292
 

/*
constructor(props){
        super(props);
        this.state={
            modalVisible: true
        }
    }

    _onNavigationStateChange (webViewState) {
        this.hide()
    }
    
    show () {
       this.setState({ modalVisible: true })
    }
     
    hide () {
       this.setState({ modalVisible: false })
    }
     
    render () {
    return (
    <Modal
        animationType={'slide'}
        visible={this.state.modalVisible}
        onRequestClose={this.hide.bind(this)}
        transparent
    >
        <View style={styles.modalWarp}>
            <View style={styles.contentWarp}>
                <WebView
                    style={[{ flex: 1 }, this.props.styles]}
                    source={{uri: url, method: 'POST' }}
                    scalesPageToFit
                    startInLoadingState
                    onNavigationStateChange={this._onNavigationStateChange.bind(this)}
                    onError={this._onNavigationStateChange.bind(this)}
                />
                <TouchableOpacity onPress={this.hide.bind(this)} style={styles.btnStyle}>
                <Text style={styles.closeStyle}>close</Text>
                </TouchableOpacity>
            </View>
        </View>
    </Modal >
*/