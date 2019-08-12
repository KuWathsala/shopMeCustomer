import React, {Component} from 'react';
import {
    Text, View, StyleSheet, Image, ScrollView, Dimensions, FlatList, Platform, TouchableOpacity     
} from 'react-native';
import {Data} from '../Home/Data';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';

class VirticalFlatListItem extends Component{
    render(){
        return(
            <View style={{height:100,}}>
              <View style={{flexDirection:'row', flex:1, borderColor: 'black', borderWidth: 1}}>
                <Image style={{width:100, height:100, margin: 5}}source={{uri: "data:image/jpeg;base64,"+this.props.item.image}}  />
                <View style={{flex:1,flexDirection:'column', height: 100}}>
                    <Text>{this.props.item.name}</Text>
                    <Text>{this.props.item.unitPrice}</Text>
                </View>
              </View>
            </View>
        );
    }
}

const widthScreen=Dimensions.get('window').width;
const heightScreen=Dimensions.get('window').height;

class CartItems extends Component {
    static navigationOptions = { header: null };

    componentDidMount(){
        console.log(this.props);
    }

    render () {
    return (
    <View style={styles.container}>
        <View>
        <FlatList style={{backgroundColor: "white", opacity: 1, }}

            //numColumns = { widthScreen > heightScreen ? 2 : 1 }
            virtical={true}
            //data={Data}
            data={this.props.cart.arr}
            showsVerticalScrollIndicator={false} 
            renderItem={({item, index}) => {
                    return (
                    <VirticalFlatListItem item={item} index={index} parentFlatList={this}>
                
                    </VirticalFlatListItem>
                )
            }}
            keyExtractor={(item, index) => index.toString()}
        >
            
        </FlatList>
        </View>
    </View>
    );
  }
}

const mapStateToProps=state=>{
    return {
      cart: state.cart,
    };
}
  
export default connect(mapStateToProps)(CartItems);

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
