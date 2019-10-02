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
import ModalSelector from 'react-native-modal-selector';
import axios from 'axios';
const KEYS_TO_FILTERS = ['name', 'description', 'shortDescription','category'];

class Products extends Component {
  static navigationOptions = { title: "products" };

  constructor(props){
    super(props);
    this.state = {
      search: '',
      sort: '',
      categoriesData: [],
    }
  }

  componentDidMount(){
      this.props.fetchProductList(this.props.navigation.getParam('id', '-'),);
      axios.get('https://backend-webapi20190825122524.azurewebsites.net/api/categories')//http://192.168.43.15:5001/api
      .then(response=>{
        this.setState({ categoriesData: response.data})//[...this.state.categoriesData, response.data]
        console.log(response.data)
      })
      .catch(error=>{console.log(error)})
  }

  searchUpdated(term) {
    this.setState({ search: term })
  }

  render () {
    const filteredProducts = this.props.productsList.products.filter(createFilter(this.state.search+" "+this.state.sort, KEYS_TO_FILTERS));
    let productList=<ProductsList data={filteredProducts} navigation={this.props.navigation} />;
    var loading=this.props.productsList.loading;
    //var done=this.props.productsList.loading 

    if(loading)
      return (<ActivityIndicator size="large" style={styles.container} />);
    else 
    return (
        <View>
          <View style={{flexDirection: 'row', marginTop: 5, width: widthScreen}}>
            <ModalSelector style={{width: widthScreen/2-10, marginLeft: 5, borderColor: 'black'}}
              data={this.state.categoriesData}
              initValue="search by category..."
              supportedOrientations={['landscape']}
              accessible={true}
              scrollViewAccessibilityLabel={'Scrollable options'}
              cancelButtonAccessibilityLabel={'Cancel Button'}
              onChange={(option)=>{ this.setState({sort: option.categoryName})}}
              keyExtractor= {item => item.id}
              labelExtractor= {item => item.categoryName}
            >
              {/*<Icon style={styles.icon} name="md-<ion-icon name="checkmark-circle-outline"></ion-icon>" size={33} color="#593196" />*/}
            </ModalSelector>
        
            <SearchInput  
              onChangeText={(term) => { this.searchUpdated(term), console.log(filteredProducts)}} 
              style={styles.serchText}
              placeholder="find products..."
            />
          </View>
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

const widthScreen=Dimensions.get('window').width;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D3D3D3', 
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
    width: widthScreen/2-5,
    height: 38,
    marginLeft: 10,
    marginRight: 5,
    fontSize: 17,
    marginLeft: 5,
    padding: 5,
    borderWidth: 1,
    borderRadius: 5,
    borderColor: 'gray',
    textAlign:'center'
  },
});



