import React, {Component} from 'react';
import { Text, View, StyleSheet, Alert, Image, Dimensions, FlatList, Platform, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import * as Progress from 'react-native-progress';
import {Products, Rate} from '../../Menu/screenNames';
import Button from 'react-native-button';


const FlatListItem = (props) => {
    return(
        //<TouchableOpacity   
            //onPress={() => props.navigation.navigate(Products, props.item)}    
        //>
        <View style={styles.listItem}>
            <View>
                <View style={{ flexDirection: 'column'}}>
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
                    <Button style={styles.buttonTrack}
                        onPress={() => props.navigation.navigate(Rate)} //resetTo
                    >
                        track the order
                    </Button>
                    <Button style={styles.buttonConfirm}>confirm order received</Button>

                </View>
            </View>
        </View>
        //</TouchableOpacity>
    );
}

export default class ShopsList extends Component {
    render(){
        //let columns= columns=Math.floor(widthScreen/200);
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
        justifyContent: 'center',
        width: widthScreen-10,
        height: 350,
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
    },
    buttonTrack: {
        alignSelf:'center',
        width: widthScreen-40,
        height: 30,
        fontSize: 17,
        backgroundColor: '#f06767',
        paddingTop: 3,
        marginTop: 10,
        color: 'white',
    },
    buttonConfirm: {
        alignSelf:'center',
        justifyContent:'flex-end',        width: widthScreen-40,
        height: 30,
        fontSize: 17,
        backgroundColor: '#37b864',//
        color: '#7dd19b',
        paddingTop: 3,
        marginTop: 10,
        color: 'white',
    },
});
