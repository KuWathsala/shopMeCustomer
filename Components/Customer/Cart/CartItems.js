import React, {Component} from 'react';
import {
    Text, View, StyleSheet, Image, ScrollView, Dimensions, FlatList, Platform, TouchableOpacity, Alert, Linking  
} from 'react-native';
import {Data} from '../Home/Data';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import {removeCartItems,fetchCart} from '../Redux/Actions/cartActions';
import Button from 'react-native-button';
import {BuyIt} from  '../../Menu/screenNames';

class VirticalFlatListItem extends Component{

    constructor(props){
        super(props);
    }

    click=(index)=>{
        this.props.removeItem(index);
    }

    render(){
        const {index}=this.props;
        return(
            <View style={styles.listItem}>
              <View style={{flexDirection:'row', flex:1, borderColor: 'black', borderWidth: 1}}>
                <Image style={{width:100, height:85, margin: 5}} source={{uri: this.props.item.image}}  />
                <View style={{flex:1,flexDirection:'column', height: 100}}>
                    <Text style={{fontSize: 19}}>{this.props.item.name}</Text>
                    <Text>{this.props.item.description}</Text>
                    <Text style={{fontSize: 17,color: 'blue'}}> quantity   :  {this.props.item.quantity}</Text>
                    <Text style={{fontSize: 17,color: 'red'}} > unit price LKR :  {this.props.item.unitPrice*(1-this.props.item.discount/100)}</Text>
                </View> 
                <TouchableOpacity onPress={()=>this.click(index)}>
                    <Icon style={{alignSelf: 'flex-end', paddingRight : 5}} name="md-trash" size={30} color="gray" /> 
                </TouchableOpacity>
              </View>
            </View>
        );
    }
}

const widthScreen=Dimensions.get('window').width;
const heightScreen=Dimensions.get('window').height;

class CartItems extends Component {
    //static navigationOptions = { header: 'Cart' };

    constructor(props){
        super(props);
        this.state={
            total: 0
        }
        this.removeItem = this.removeItem.bind(this);
    }

    openPayHere() {
        let url="https://www.google.com"
        console.log("payhere")
        Linking.canOpenURL(url)
        .then((supported) => {
            if (!supported) {
            console.log("Can't handle url: " + url);
            } else {
            return Linking.openURL(url);
            }
        })
        .catch((err) => console.error('An error occurred', err));
    }

    removeItem(index){
        Alert.alert('Item is removed')
        this.props.removeCartItems(index);
        console.log("this.props.cart.arr")
        console.log(this.props.cart.arr)
    }

    componentDidMount(){
    }

    render () {
    if(this.props.cart.arr.length!=0)
        return (
            <View style={styles.container}>

                <FlatList style={{backgroundColor: "white", opacity: 1, }}
                    //numColumns = { widthScreen > heightScreen ? 2 : 1 }
                    virtical={true}
                    //data={Data}
                    data={this.props.cart.arr}
                    showsVerticalScrollIndicator={false} 
                    renderItem={({item, index}) => {
                            return (
                            <VirticalFlatListItem 
                                item={item} index={index} removeItem={this.removeItem}  parentFlatList={this}
                            >
                        
                            </VirticalFlatListItem>
                        )
                    }}
                    keyExtractor={(item, index) => index.toString()}
                >
                </FlatList>

                <TouchableOpacity style={{ width:150, height:40, position: 'absolute', bottom: 10, marginRight: 20}}
                    onPress={this.openPayHere}  
                >
                    <Image style={{ width:150, height:40, margin: 5}} source={require('../../../Assets/payhere.png')}  />
                </TouchableOpacity>
                <Text style={{fontSize: 25, color: 'red', alignSelf:'flex-end', bottom: 10,}} >Total : {this.props.cart.total} LKR </Text>
                
            </View>
        );
    else
        return( <View style={{flex: 1,flexDirection:'column', justifyContent: 'center', alignItems:'center'}}>
                <Icon style={styles.icon} name="md-cart" size={100} color="gray" />
                <Text>Currently there are no items in your cart</Text>
        </View> 
    );
  }
}

const mapStateToProps=state=>{
    return {
      cart: state.cart,
    };
}
  
export default connect(
    mapStateToProps,{
        removeCartItems,
        fetchCart
    }
)(CartItems);

const styles = StyleSheet.create({
    
    container: { 
        flex: 1,
        flexDirection:'column',
        marginTop: Platform.OS==='ios' ? 34 : 0,
        //alignItems: 'center'
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
    },
    listItem: {
        flex: 1,
        flexDirection:'column',
        alignItems:'center',
        width: widthScreen-10,
        height: 100,
        borderWidth: 1,
        borderColor:'black',
        margin: 4, 
    },
    button: {
        width: '100%',
        height: 45,
        marginRight: 5,
        fontSize: 21,
        backgroundColor: '#593196',
        marginTop: 10,
        padding: 5,
        paddingLeft:10,
        color: 'white',
        marginBottom: 0
    },
  });
