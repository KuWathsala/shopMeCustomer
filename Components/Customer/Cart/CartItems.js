import React, {Component} from 'react';
import {
    Text, View, StyleSheet, Image, ScrollView, Dimensions, FlatList, Platform, TouchableOpacity     
} from 'react-native';
import {Data} from '../Home/Data';
import Icon from 'react-native-vector-icons/Ionicons';
import Swipeout from 'react-native-swipeout-longpressforandroid';

class VirticalFlatListItem extends Component{
    render(){

        const swipeSettings={
            autoClose: true,
            onClose:(secId, rowId, Direction)=> {

            },
            onOpen:(secId, rowId, Direction)=> {

            } ,
            right: [
                {
                    onPress:()=>{},
                    text: 'Delete', type: 'delete'
                }
            ],
            rowId: this.props.index,
            sectionId:1
        }

        return(
            <Swipeout {...swipeSettings}>
            <View style={{height:100,}}>
              <View style={{flexDirection:'row', flex:1, borderColor: 'black', borderWidth: 1}}>
                <Image style={{width:100, height:100, margin: 5}} source={require('../../../Assets/food.jpg')}  />
                <View style={{flex:1,flexDirection:'column', height: 100}}>
                    <Text>{this.props.item.name}</Text>
                    <Text>{this.props.item.unitPrice}</Text>
                </View>
              </View>
            </View>
            </Swipeout>
        );
    }
}

const widthScreen=Dimensions.get('window').width;
const heightScreen=Dimensions.get('window').height;

export default class CartItems extends Component {
    static navigationOptions = { header: null };

    render () {
    return (
    <View style={styles.container}>
        <View>
        <FlatList style={{backgroundColor: "white", opacity: 1, }}

            //numColumns = { widthScreen > heightScreen ? 2 : 1 }
            virtical={true}
            data={Data}
            showsVerticalScrollIndicator={false} 
            renderItem={({item, index}) => {
                    return (
                    <VirticalFlatListItem item={item} index={index} parentFlatList={this}>
                
                    </VirticalFlatListItem>
                )
            }}
            keyExtractor={(item, index) => item.name}
        >
            
        </FlatList>
        </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
    
    container: { 
        flex: 1,
        flexDirection:'column',
        marginTop: Platform.OS==='ios' ? 34 : 0,
        //alignItems: 'center'
    },
    icon: {
        width: 30,
        height:30,
        //tintColor: 'red'
    },
    text:{
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        margin: 10,
    },
    image:{
        width: 100,
        height: 100
    }
  });
