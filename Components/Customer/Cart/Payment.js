import React, { Component } from 'react';
import { Platform, StyleSheet, Text, Modal, View, TouchableOpacity} from 'react-native';
import {WebView} from 'react-native-webview';
import {deleteCart} from '../Redux/Actions/cartActions';
import {connect} from 'react-redux';

class Payment extends Component{
    
    constructor(props){
        super(props);
        this.state={
            order_id: this.props.navigation.getParam('id', '-'),
        }
    }

    componentDidMount(){
        console.log(this.props)
        console.log(this.state.order_id)
    }
    
    onNavigationStateChange (webViewState) {
        console.log(webViewState.url)
        if(webViewState.url===`https://www.google.lk/?order_id=${this.state.order_id}`){
            this.props.navigation.navigate('CartItems')
            this.props.deleteCart();
        }
    }

    render(){
        const url = `https://sandbox.payhere.lk/pay/checkout?merchant_id=1213071&return_url=https://www.google.lk&cancel_url=https://www.bing.lk&order_id=${this.state.order_id}&items=&currency=LKR&amount=${this.props.cart.total}&first_name=&last_name=&email=&phone=&address=&city=&country=&notify_url=https://backend-webapi20190825122524.azurewebsites.net/api/payments/update`
        return(
        <WebView
            source={{uri: url, method: 'POST' }}
            onNavigationStateChange={this.onNavigationStateChange.bind(this)}
        />
    );
    }
}

const mapStateToProps=state=>{
    return {
      cart: state.cart
    };
}
  
export default connect(
    mapStateToProps,{
        deleteCart,
    }
)(Payment);
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