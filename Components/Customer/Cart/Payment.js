import React, { Component } from 'react';
import { Platform, StyleSheet, Text, Modal, View, TouchableOpacity, ActivityIndicator, Linking} from 'react-native';
import {WebView} from 'react-native-webview';
import {deleteCart} from '../Redux/Actions/cartActions';
import {connect} from 'react-redux';
import axios from 'axios';
import baseURL from '../../Base';

class Payment extends Component{
    
    constructor(props){
        super(props);
        this.state={
            order_id: this.props.navigation.getParam('id', '-'),
            sellerId: this.props.navigation.getParam('sellerId', '-'),
            loading: true ,
            accountNo: 0
        }
    }

    componentDidMount(){
        //alert(this.state.sellerId)  
        axios.get(`${baseURL}/api/sellers/${this.state.sellerId}`) //https://backend-webapi20190825122524.azurewebsites.net/api/orders/createNewOrder${order}
        .then(response=>{
            //alert(response.data.accountNo)
            this.setState({accountNo: response.data.accountNo})
            console.log("merchantId  "+response.data.accountNo)
        }) 
        .catch (error=>{
            console.log(error);
        })
    }

    showSpinner() {
        this.setState({ loading: true });
    }
    
    hideSpinner() {
        this.setState({ loading: false });
    }
    
    onNavigationStateChange (webViewState) {
        console.log(webViewState.url)
        if(webViewState.url===`https://google.com/?order_id=${this.state.order_id}`){
            this.props.navigation.navigate('CartItems')
            this.props.deleteCart();
        }
    }

    render(){
        const url = `https://sandbox.payhere.lk/pay/checkout?merchant_id=${this.state.accountNo}&return_url=https://google.com&cancel_url=https://google.com&order_id=${this.state.order_id}&items=xxxx&currency=LKR&amount=${this.props.cart.total}&first_name=xxxx&last_name=xxx&email=xxxx&phone=0716325124&address=xxxx&city=xxxx&country=SriLanka&notify_url=${baseURL}/api/orders/update-payment`//?order_id=${this.state.order_id}&status_codes=${2}
        return(
        <View
            style={this.state.loading === true ? styles.stylOld : styles.styleNew}>
            
            {this.state.loading ? (<ActivityIndicator color="green" size="large" style={styles.activityIndicatorStyle}/> ) : null}
            
            <WebView
                source={{uri: url, method: 'POST' }}
                onNavigationStateChange={this.onNavigationStateChange.bind(this)}
                onLoadStart={() => this.showSpinner()}
                onLoad={() => this.hideSpinner()}
            />
      </View>
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
 

const styles = StyleSheet.create({
    stylOld: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    styleNew: {
      flex: 1,
    },
    activityIndicatorStyle: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
    },
  });
  