import React, {Component} from 'react';
import {
    Text, View, StyleSheet, Image, ScrollView, Dimensions, Alert, Platform, TouchableOpacity, Picker
} from 'react-native';
import {ProductDetailData} from './Data';
import Icon from 'react-native-vector-icons/Ionicons';
import {BuyIt} from '../../Menu/screenNames'; 
import Button from 'react-native-button';
import { Dropdown } from 'react-native-material-dropdown';
import {connect} from 'react-redux';
import {addCartItems} from '../Redux/Actions/cartActions';

class ProductDetails extends Component {

    constructor(props){
        super(props);
        this.state={
            product: {
                id: this.props.navigation.getParam('id', '-'),
                name: this.props.navigation.getParam('name', '-'),
                description: this.props.navigation.getParam('description', '-'),
                shortDescription: this.props.navigation.getParam('shortDescription', '-'),
                unitPrice: this.props.navigation.getParam('unitPrice', '-'),
                image: this.props.navigation.getParam('image', '-'),
                quantity: this.props.navigation.getParam('quantity', '-'),
                rating: this.props.navigation.getParam('rating', '-'),
                like: this.props.navigation.getParam('like', '-'),
                discount: this.props.navigation.getParam('discount', '-'),
                selectedQuantity:1,
                isaddedToCart: false
            },
        }
    }

    componentDidMount(){
        console.log("productDetails"+this.props);
    }

    onChangeHandler = (value) => {
        this.setState({ ...this.state.product.selectedQuantity = value })
    }

    addToCart=()=> {
        let isAvailble= false;
        for(let i = 0; i < this.props.cart.arr.length ; i++){
            if(this.props.cart.arr[i].id===this.state.product.id){
               Alert.alert('item is already in the cart')
               isAvailble=true;
               break;
            }
        }
        if(!isAvailble)this.props.addCartItems(this.state.product);
        console.log(this.props);
    }
    render () {
        let data=[{value:1},{value:2},{value:3},{value:4},{value:5},{value:6}];
        
    return (
        <ScrollView>
        <View style={styles.container}>
            <View style={styles.listItem}>
                <Image style={styles.image} source={{uri: "data:image/jpeg;base64,"+this.state.product.image}} />
                <Text style={styles.textName}> {this.state.product.name}</Text>
                <Text style={styles.text}>{this.state.product.description}</Text>
                <Text style={styles.text}>{this.state.product.shortDescription}</Text>
                <Text style={styles.text}>Unit Price LKR: {this.state.product.unitPrice}</Text>
                <Text style={styles.text}>Available: {this.state.product.quantity}</Text>
                <Text style={styles.text}>Rating: {this.state.product.rating}</Text>
                <Text style={styles.text}>Likes: {this.state.product.like}</Text>
                <Text style={styles.text}>Discount: {this.state.product.discount}</Text> 
            </View>

            {/*quantity */}
            <View style={styles.box}>
                <Dropdown style={styles.dropdown} 
                    labelFontSize={25} textColor='black' 
                    fontSize={20}
                    itemCount={10} itemColor="black"
                    label="Quantity"
                    data={data}
                    onChangeText={(value) => this.onChangeHandler(value)}
                />
                <Button style={styles.button} 
                    onPress={() => this.props.navigation.navigate(BuyIt,this.state.product)}    
                >
                    Buy It
                </Button>
                <Button style={styles.button} 
                    onPress={this.addToCart}  
                >
                    Add to cart
                </Button>

            </View>

        </View>
        </ScrollView>
    );
  }
}

const mapStateToProps=state=>{
    return {
        cart: state.cart,
        //productsList: state.productsList
    };
}
  
export default connect(mapStateToProps,{
    addCartItems
})(ProductDetails);
  


const widthScreen=Dimensions.get('window').width;
const heightScreen=Dimensions.get('window').height;

const styles = StyleSheet.create({
    
    container: { 
        flex: 1,
        flexDirection:'column',
        marginTop: Platform.OS==='ios' ? 34 : 0,
    },
    listItem: {
        alignItems:'baseline',
    },
    icon: {
        width: 30,
        height:30,
        tintColor: 'red'
    },
    text:{
        fontSize: 20,
        marginLeft: 20,
        marginTop: 15,
        color: 'gray',
    },
    textName:{
        marginTop: 20,
        fontSize: 25,
        textAlignVertical: 'center',
        color: 'black',
    },
    image:{
        width: widthScreen,
        height: 300,
        resizeMode:'center'
    },
    button:{
        padding: 10,
        margin:8,
        height:40,
        backgroundColor: '#593296',
        fontSize: 18,
        color: 'white'
    },
    box:{
        marginTop: 20,
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: '#593296'
    },
    dropdown:{
        marginTop: 10,
        marginLeft:20,
        marginRight: 20
    }
  });