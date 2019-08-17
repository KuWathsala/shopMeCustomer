import React, {Component} from 'react';
import { Text, View, StyleSheet, Alert, Image, Dimensions, FlatList, Platform, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Progress from 'react-native-progress';
import {Products} from '../../Menu/screenNames';

const FlatListItem = (props) => {
    return(
        <TouchableOpacity 
            //onPress={() => props.navigation.navigate(Products, props.item)}    
        >
            <View style={styles.listItem}>
                <View style={{ flexDirection: 'column',alignSelf: 'baseline'}}>
                    <Text style={styles.textDes}>Order Id: {props.item.id}</Text>
                    <Text style={styles.textDes}>Ordered At: {props.item.createdAt}</Text>
                    <Text style={styles.textDes}>Order status: {props.item.orderStatus}</Text>
                    <Text style={styles.textDes}>Total LKR: {props.item.totalPrice}</Text>
                    <FlatList data={props.item.products} 
                        keyExtractor={(item, index) => item.id.toString()}
                        renderItem={({item, index}) => {
                            return (
                                <View style={{flexDirection: 'column'}}>
                                    <Text>Name: {item.name}</Text>
                                    <Text>Quantity: {item.quantity}</Text>
                                    <Text>unit Price: {item.unitPrice*(1-item.discount/100)}</Text>
                                </View>
                            )
                        }}
                    />
                </View>
            </View>
        </TouchableOpacity>
    );
}

export default class ShopsList extends Component {
    render(){
        let columns= columns=Math.floor(widthScreen/200);
        return (
            <View style={styles.container}>
                <View>
                    <FlatList style={{backgroundColor: "white", opacity: 1}}
                        numColumns={1}
                        horizontal={false}
                        data={this.props.data}
                        showsHorizontalScrollIndicator={false} 
                        renderItem={({item, index}) => {
                            return (
                                <FlatListItem navigation={this.props.navigation}
                                    item={item} index={index} parentFlatList={this}>
                                </FlatListItem>
                            )
                        }}
                        keyExtractor={(item, index) => item.id.toString()}
                    />
                </View>
            </View>
        );
    }
};


const widthScreen=Dimensions.get('window').width;
const heightScreen=Dimensions.get('window').height;

const styles = StyleSheet.create({
    
    container: { 
        flex: 1,
        flexDirection:'column',
        marginTop: Platform.OS==='ios' ? 34 : 0,
    },
    listItem: {
        flex: 1,
        flexDirection:'column',
        alignItems:'center',
        width: widthScreen-10,
        height: 300,
        borderWidth: 1,
        borderColor:'black',
        margin: 4, 
    },
    icon: {
        width: 30,
        height:30,
        tintColor: 'red'
    },
    text:{
        fontSize: 17,
        fontWeight: 'bold',
        color: 'black',
        margin: 3,
    },
    textDiscount:{
        fontSize: 17,
        color: 'red',
        textDecorationLine: 'line-through',
        margin: 3, 
    },
    textDes:{
        fontSize: 17,
        color: 'black',
        margin: 2,
    },
    image:{
        width: 180,
        height: 150,
        resizeMode:'center'
    }
});
