import React, {Component} from 'react';
import {Text, View, StyleSheet, Button, Image, ScrollView, TextInput, Dimensions, TouchableOpacity, ActivityIndicator} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import ShopsList from './ShopsList';
import { fetchShopsList } from '../Redux/Actions/shopsListActions';
import { fetchCustomerLocation } from '../Redux/Actions/locationActions';
import {connect} from 'react-redux';
import {Locaton, SearchPlace} from '../../Menu/screenNames';
import Geocoder from 'react-native-geocoding';
import SearchInput, {createFilter,} from 'react-native-search-filter';
import '../../Constants/Constant';
import { MAP_API_KEY } from '../../Constants/Constant';
Geocoder.init(MAP_API_KEY);
const KEYS_TO_FILTERS = ['shopName','shopAddress'];

class Shops extends Component {
  static navigationOptions = { header: null };

  constructor(props){
    super(props);
    this.state = {
      searchShop: '',
    }
  }
  
  componentDidMount(){
    this.props.fetchShopsList(this.props.location.source.latitude, this.props.location.source.longitude);
  }

  searchUpdated(term) {
    this.setState({ searchShop: term })
  }

  render () {
    const filteredShops = this.props.shopsList.shops.filter(createFilter(this.state.searchShop, KEYS_TO_FILTERS));
    let shopsList=<ShopsList data={filteredShops} navigation={this.props.navigation}  />//this.props.shopsList.shops
    var loading=this.props.shopsList.loading;
    var isEmpty=((this.props.shopsList.shops).length===0)

    if(loading)
      return (<ActivityIndicator size="large" style={styles.container} />);
    else if(isEmpty)
      return (<Text style={styles.text} >No shops available currently your place </Text>);
    else return (
        <View style={styles.container}>
          <TouchableOpacity style={{flexDirection:'row', width:'100%'}}
            onPress={() =>this.props.navigation.navigate(SearchPlace) }  
          >
            <Icon style={styles.icon} name="ios-pin" size={30} color="#593196" />
            <Text style={styles.address}>{this.props.location.source.address}</Text>
          </TouchableOpacity>
            
          <SearchInput  
            onChangeText={(term) => { this.searchUpdated(term), console.log(filteredShops), console.log(this.state.searchShop) }} 
            style={styles.serchText}
            placeholder="find shop to shop..."
          /> 
          
          <ScrollView>
            {shopsList}
          </ScrollView>
        </View>
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

const widthScreen=Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
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
    color:'black'
  },
  address: {
    width: '100%',
    marginRight: 5,
    fontSize: 17,
    marginLeft: 10,
    marginTop: 10,
    padding: 5,
    paddingLeft:10,
    borderRadius: 20,
  },
  serchText: {
    width: widthScreen-10,
    height: 38,
    marginRight: 5,
    fontSize: 17,
    marginLeft: 5,
    padding: 5,
    paddingLeft: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'gray'
  },
});
