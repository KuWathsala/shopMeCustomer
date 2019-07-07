import React, {Component} from 'react';
import {Text, View, StyleSheet, Button, Image, ScrollView, Dimensions, TouchableOpacity, ActivityIndicator} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import ProductsList from './ProductsList';
import {fetchPopularProductList, fetchDiscountedProductList, fetchMoreProductList } from '../Redux/Actions/productListActions';
import {connect} from 'react-redux';
import {Locaton} from '../../Menu/screenNames';
import SearchPlace from '../../Map/SearchPlace';

class HomeHeader extends Component {
  static navigationOptions = { header: null };

  componentDidMount(){
      this.props.fetchPopularProductList();
      this.props.fetchDiscountedProductList();
      this.props.fetchMoreProductList();
      console.log(this.props)
  }

  render () {

    let popularProductList=<ProductsList data={this.props.popularProductsList.popularProducts} navigation={this.props.navigation} />;
    let discountedProductList=<ProductsList data={this.props.discountedProductsList.discountedProducts} navigation={this.props.navigation} />;
    let moreProductList=<ProductsList data={this.props.moreProductsList.moreProducts} navigation={this.props.navigation} />
    var loading=this.props.popularProductsList.loading||this.props.discountedProductsList.loading||this.props.moreProductsList.loading
    var done=this.props.popularProductsList.loading && this.props.discountedProductsList.loading && this.props.moreProductsList.loading

    if(loading)
      return (<ActivityIndicator size="large" style={styles.container} />);
    else 
    return (
        <ScrollView>
          <View style={styles.container}>

            <Text style={styles.text}>Most popular Items</Text>
            {popularProductList}
            
            <Text style={styles.text}>Discounted Items</Text>
            {discountedProductList}
          
            <Text style={styles.text}>More Items</Text>
            {moreProductList}

          </View>
        </ScrollView>
    );
  }
}

const mapStateToProps=state=>{
  return {
    popularProductsList: state.popularProductsList,
    discountedProductsList: state.discountedProductsList,
    moreProductsList: state.moreProductsList
  };
}

export default connect(mapStateToProps,{
  fetchPopularProductList,
  fetchDiscountedProductList,
  fetchMoreProductList
})(HomeHeader);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {
    width: 30,
    height:30,
    tintColor: 'white'
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
  }
});



