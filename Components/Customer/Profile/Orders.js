import React, {Component} from 'react';
import {
    Text, View, StyleSheet, Image, ScrollView, Dimensions, FlatList, Platform, TouchableOpacity     
} from 'react-native';
import {Data} from '../Home/Data';
import Icon from 'react-native-vector-icons/Ionicons';

const VirticalFlatListItem =(props)=> {
    return (
      <View style={{height:100,}}>
        <View style={{height:100,}}>
          <View style={{flexDirection:'row', flex:1, borderColor: 'black', borderWidth: 1}}>
            <Image style={{width:100, height:100, margin: 5}} source={require('../../../Assets/food.jpg')}  />
            <View style={{flex:1,flexDirection:'column', height: 100}}>
                <Text>{props.item.name}</Text>
                <Text>{props.item.unitPrice}</Text>
            </View>
          </View>
          </View>
      </View>
    );
}

const widthScreen=Dimensions.get('window').width;
const heightScreen=Dimensions.get('window').height;

const OrderItems = (props) => {
    return (
    <View style={styles.container}>
        <View>
        <FlatList style={{backgroundColor: "white", opacity: 1,}}

            numColumns = { widthScreen > heightScreen ? 2 : 1 }
            virtical={true}
            data={Data}
            showsVerticalScrollIndicator={false} 
            renderItem={({item, index}) => {
                    return (
                    <VirticalFlatListItem item={item} index={index} parentFlatList={this}
                        navigation={props.navigation} />
                )
            }}
            keyExtractor={(item, index) => item.name}
        >
            
        </FlatList>
        </View>
    </View>
    );
}

export default OrderItems;

const styles = StyleSheet.create({
    
    container: { 
        flex: 1,
        flexDirection:'column',
        marginTop: Platform.OS==='ios' ? 34 : 0,
        //alignItems: 'center'
    },
  });
