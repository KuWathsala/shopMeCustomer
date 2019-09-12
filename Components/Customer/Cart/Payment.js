import React, { Component } from 'react';
import { Platform, StyleSheet, Text, } from 'react-native';
import {WebView} from 'react-native-webview';


export default class Payment extends Component{

    constructor(props){
        super(props);
    }

    render(){
        return(
        <WebView
            source={{uri: 'https://www.google.com'}}
            style={{marginTop: 20}}
        />
    );
    }
}