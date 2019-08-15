import React, {Component} from 'react';
import {Text, View, StyleSheet, Button, Image, ScrollView, Dimensions, TouchableOpacity, ActivityIndicator} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import ProductsList from './ProductsList';
import {fetchProductList} from '../Redux/Actions/productListActions';
import {connect} from 'react-redux';
import {Locaton, Categories} from '../../Menu/screenNames';
import SearchPlace from '../../Map/SearchPlace';
import SearchInput, {createFilter,} from 'react-native-search-filter';
import { TextInput } from 'react-native-gesture-handler';
const KEYS_TO_FILTERS = ['name', 'description', 'shortDescription',];

class Products extends Component {
  static navigationOptions = { title: "products" };

  constructor(props){
    super(props);
    this.state = {
      searchProducts: '',
      category: 'tap to find by categories...'
    }
  }

  componentDidMount(){
      this.props.fetchProductList(this.props.navigation.getParam('id', '-'),);
      console.log(this.props)
  }

  searchUpdated(term) {
    this.setState({ searchProducts: term })
    console.log("search updated"+this.state.searchProducts)
  }

  render () {
    const filteredProducts = this.props.productsList.products.filter(createFilter(this.state.searchProducts, KEYS_TO_FILTERS));
    let productList=<ProductsList data={filteredProducts} navigation={this.props.navigation} />;
    var loading=this.props.productsList.loading;
    var done=this.props.productsList.loading 

    if(loading)
      return (<ActivityIndicator size="large" style={styles.container} />);
    else 
    return (
      <View>
        <TouchableOpacity style={{flexDirection:'row', width:'100%'}}
            onPress={() =>this.props.navigation.navigate(Categories) }  
        >
          <Icon style={styles.icon} name="md-apps" size={33} color="#593196" />
          <Text style={styles.text}>{this.state.category}</Text>
        </TouchableOpacity>
        
        <SearchInput  
          onChangeText={(term) => { this.searchUpdated(term), console.log(filteredProducts)}} 
          style={styles.serchText}
          placeholder="find products..."
        />
        <ScrollView>
          <View style={styles.container}>
            {productList}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps=state=>{
  return {
    productsList: state.productsList,
  };
}

export default connect(mapStateToProps,{
  fetchProductList,
})(Products);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    //justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    marginTop: 5,
    marginLeft: 10,
    width: 30,
    height:30,
  },
  textLocation:{
    fontSize: 16,
    fontWeight: 'normal',
    color:'#593196'
  },
  text:{
    fontSize: 16,
    fontWeight: 'normal',
    margin: 10,
    //color:'#593196'
  },
  serchText: {
    width: '98%',
    marginRight: 5,
    fontSize: 17,
    marginLeft: 5,
    marginTop: 5,
    padding: 5,
    paddingLeft:10,
    paddingRight:10,
    borderColor: '#593196',
    borderWidth: 1,
    borderRadius: 20,
  },
});



