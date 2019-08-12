import React, {Component} from 'react';
import { Text, View, StyleSheet, Alert, Image, Dimensions, FlatList, Platform, TouchableOpacity} from 'react-native';
import {Data} from './Data';
import Icon from 'react-native-vector-icons/Ionicons';
import {Products} from '../../Menu/screenNames';

//const columns=Math.floor(widthScreen/200);
const FlatListItem = (props) => {
    return(
        <TouchableOpacity 
            onPress={() => props.navigation.navigate(Products, props.item)}    
        >
            <View style={styles.listItem}>
                
                <Image style={styles.image} source={{uri: "data:image/jpeg;base64,"+props.item.image}}/>
                <View style={{alignSelf: 'baseline',flexDirection:'column'}}>
                    <Text style={styles.text}>{props.item.shopName}</Text>
                    <Text style={styles.textDes}>close To you: {props.item.distance.toFixed(1)} km</Text>
                    <Text style={styles.textDes}>Address: {props.item.shopAddress}</Text>
                </View>

                <View style={{ flexDirection: 'row',alignSelf: 'baseline'}}>
                    <Text style={styles.textLike}><Icon name="ios-pin" size={20} color="green" /> {props.item.rating}  </Text>
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
                        numColumns={columns}
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
        width: 200,
        height: 250,
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
    textLike:{
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        margin: 3,
    },
    image:{
        width: 180,
        height: 150,
        resizeMode:'center'
    }
});
