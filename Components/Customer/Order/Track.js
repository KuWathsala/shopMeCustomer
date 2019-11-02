import React, {Component} from 'react';
import {Text, View, StyleSheet, Image, Dimensions, ScrollView, Linking, ActivityIndicator} from 'react-native';
import {Rating} from 'react-native-ratings';
import {} from '../../Menu/screenNames';
import axios from 'axios';
import Icon from 'react-native-vector-icons/Ionicons';

export default class Rate extends Component {

    constructor(props){
        super(props)
        this.state={
          orderId:102,// this.props.navigation.getParam('id', '-'),
          orderStatus: 'to be confirmed',// this.props.navigation.getParam('orderStatus', '-'),
          sellerId: 0,
          delivererId: 2,
          sellerDetails: {
            shopName: '',
            shopAddress: '',
            mobileNumber: '',
            image: ''
          },
          delivererDetails: {
            firstName: '',
            lastName: '',
            profileImage: '',
            vehicleNo: '',
            mobileNumber: ''
          },
          loading: true
        }
    } 

    componentDidMount(){
        axios.get(`https://backend-webapi20191102020215.azurewebsites.net/api/orders/GetOrderDetailsById/${this.state.orderId}`) 
        .then(response=>{
            this.setState({sellerId: response.data.products[0].sellerId, delivererId: response.data.delivererId})
        }).catch(error=>console.log(error));

        if(this.state.delivererId!=0){
            axios.get(`https://backend-webapi20191102020215.azurewebsites.net/api/deliverers/${this.state.delivererId}`) 
            .then(response=>{
                this.setState({delivererDetails: response.data})
                axios.get(`https://backend-webapi20191102020215.azurewebsites.net/api/sellers/${parseInt(this.state.sellerId)}`) 
                .then(res=>{
                    this.setState({sellerDetails: res.data, loading: false})
                })//.catch(this.setState({loading: false}));
                this.setState({loading: false});
            })
        }
    }

  render () {
    if(this.state.loading) {
      return (<ActivityIndicator size="large" style={styles.container} />);
    }else
    return ( 
      <ScrollView>
        <View style={styles.container} >

          <View style={{flexDirection: 'column' ,flex: 1 , borderBottomWidth: 1}}>
              <Image style={styles.image} source={{uri : this.state.sellerDetails.image }}  />
              <Text style={{fontSize: 20, color: 'black', marginLeft: 5, marginTop: 30}} >order status: {this.state.orderStatus}</Text>
              <Text style={styles.text} >shop name: {this.state.sellerDetails.shopName}</Text>
              <Text style={styles.text} >address {this.state.sellerDetails.address}</Text>
              <Icon style={styles.icon} name="ios-call" size={40} color='black'  onPress={()=>{Linking.openURL(`tel:${this.state.sellerDetails.mobileNumber}`);}} />
          </View>

          <View style={{flexDirection: 'column', flex: 1}}>
              <Image style={styles.image} source={{uri : this.state.delivererDetails.profileImage }}  />
              <Text style={{fontSize: 20, color: 'black', marginLeft: 5, marginTop: 30}} >name: {this.state.delivererDetails.firstName} {this.state.lastName}</Text>
              <Text style={styles.text} >vehicle no: {this.state.delivererDetails.vehicleNo}</Text>
              <Text style={styles.text} >mobile number {this.state.delivererDetails.mobileNumber}</Text>
              <Icon style={styles.icon} name="ios-call" size={40} color='black'  onPress={()=>{Linking.openURL(`tel:${this.state.delivererDetails.mobileNumber}`);}} />
          </View>

        </View>
      </ScrollView>
    );
  }
}

const widthScreen=Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection:'column',
    justifyContent: 'center',
    color:'white',
  },
  button: {
    alignSelf:'center',       
    width: widthScreen,
    height: 45,
    fontSize: 25,
    backgroundColor: 'black',
    color: 'white',
    alignItems: 'center',
    bottom: 0,
    position: 'absolute',
  },
  text:{
    fontSize: 20,
    color: 'black',
    marginLeft: 5
  },
  image: {
    marginTop: 20,
    width:150, 
    height:150, 
    borderRadius: 75, 
    alignSelf: 'center',
    borderWidth: 1
  },
  icon: {
    marginTop: 10, 
    alignSelf: 'flex-end',
    marginRight: 20,
  }
})
