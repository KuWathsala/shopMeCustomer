import React, {Component} from 'react';
import {Text, View, StyleSheet, Button, Image, ScrollView, TextInput, Dimensions, TouchableOpacity, ActivityIndicator} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import ShopsList from './ShopsList';
import { fetchShopsList } from '../Redux/Actions/shopsListActions';
import { fetchCustomerLocation } from '../Redux/Actions/locationActions';
import {connect} from 'react-redux';
import {Locaton, SearchPlace} from '../../Menu/screenNames';
import Geocoder from 'react-native-geocoding';
Geocoder.init('AIzaSyDfp50rT_iIa365h388F4TjLEWBS39S2kM');


class Shops extends Component {
  static navigationOptions = { header: null };

  constructor(props){
    super(props);
  }
  
  componentDidMount(){
    this.props.fetchShopsList(this.props.location.source.latitude, this.props.location.source.longitude);
  }

  render () {
    let shopsList=<ShopsList data={this.props.shopsList.shops} navigation={this.props.navigation}  />
    var loading=this.props.shopsList.loading;
    var isEmpty=(this.props.shopsList.shops===[])

    if(loading)
      return (<ActivityIndicator size="large" style={styles.container} />);
    else if(isEmpty)
      return (<Text style={styles.text} >No shops available currently your place </Text>);
    else return (
        <ScrollView>
          <View style={styles.container}>
            <TouchableOpacity style={{flexDirection:'row', width:'100%'}}
              onPress={() =>this.props.navigation.navigate(SearchPlace) }  
            >
              <Icon style={styles.icon} name="ios-pin" size={30} color="#593196" />
              <Text style={styles.address} >{this.props.location.source.address}</Text>
            </TouchableOpacity>
            <Text style={styles.text}>Shops Near By you </Text>
            {shopsList}

          </View>
        </ScrollView>
    );
  }
}

const mapStateToProps=state=>{
  return {
    shopsList: state.shopsList,
    location: state.location
  };
}

export default connect(mapStateToProps,{
  fetchShopsList,
  fetchCustomerLocation
})(Shops);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    flexDirection: "column",
  },
  icon: {
    marginLeft: 10,
    marginTop: 10,
  },
  textLocation:{
    fontSize: 16,
    fontWeight: 'normal',
    color:'#593196'
  },
  text:{
    fontSize: 18,
    fontWeight: 'normal',
    margin: 20,
    color:'#593196'
  },
  address: {
    width: '100%',
    marginRight: 5,
    fontSize: 17,
    marginLeft: 10,
    marginTop: 10,
    padding: 5,
    paddingLeft:10,
    //borderColor: '#593196',
    //borderWidth: 1,
    borderRadius: 20,
  },
});
