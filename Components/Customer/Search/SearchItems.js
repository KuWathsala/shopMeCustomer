import React, {Component} from 'react';
import { Text, View, StyleSheet, Image, Dimensions, FlatList, Platform, TouchableOpacity, ActivityIndicator} from 'react-native';
import {Data} from '../Home/Data';
import SearchHeader from './SearchHeader';
import {ProductDetails, SearchItems} from '../../Menu/screenNames';
import { fetchProductSearch } from '../Redux/Actions/SearchProductListActions';
import {connect} from 'react-redux';
import Icon from 'react-native-vector-icons/Ionicons';

const VirticalFlatListItem =(props)=> {
    return (
        <TouchableOpacity 
            onPress={() => props.navigation.navigate(ProductDetails, props.item)}    
        >
            <View style={styles.listItem}>
                <Text style={styles.text}>{props.item.name}</Text>
                <Image style={styles.image} source={{uri: "data:image/jpeg;base64,"+props.item.image}}/>
                <Text style={styles.textDes}>{props.item.description}</Text>
                <View style={{alignSelf: 'baseline'}}>
                    <Text style={styles.text}>LKR: {props.item.unitPrice}</Text>
                </View>

                <View style={{ flexDirection: 'row',alignSelf: 'baseline'}}>
                    <Text style={styles.textLike}><Icon name="ios-star" size={20} color="orange" /> {props.item.rating}  |</Text>
                    <Text style={styles.textLike}><Icon name="ios-heart" size={20} color="red" /> {props.item.like}</Text>
                </View>
            </View>
        </TouchableOpacity>
    );
}
class ProductsList extends Component {

    componentDidMount(){
        this.props.fetchProductSearch(this.props.navigation.getParam('searchText'));
        console.log(this.props.navigation.getParam('searchText'))
    }

    render(){
        if(this.props.searchProductsList.loading) 
            return(
                <ActivityIndicator size="large" style={styles.container} />
            ); 
        else if(!this.props.searchProductsList.loading)
            return (
                <View style={styles.container}>
                    {/*<SearchHeader {...this.props} />*/}
                    <View>
                        <FlatList style={{backgroundColor: "white", opacity: 1}}
                            horizontal={false}
                            data={this.props.searchProductsList.searchProducts}
                            showsVerticalScrollIndicator={false}
                            renderItem={({item, index}) => {
                                return (
                                    <VirticalFlatListItem navigation={this.props.navigation}
                                        item={item} index={index} parentFlatList={this}>
                                    </VirticalFlatListItem>
                                )
                            }}
                            keyExtractor={(item, index) => item.id.toString()}
                        />
                    </View>
                </View>
            );
    }
};

const mapStateToProps=state=>{
    console.log(state)
    return {
      searchProductsList: state.searchProductsList,
    };
}

export default connect(mapStateToProps,{
    fetchProductSearch
})(ProductsList);


const widthScreen=Dimensions.get('window').width;
const heightScreen=Dimensions.get('window').height;

const styles = StyleSheet.create({
    
    container: { 
        flex: 1,
        flexDirection:'column',
        marginTop: Platform.OS==='ios' ? 34 : 0,
        alignItems: 'center'
    },
    listItem: {
        flex: 1,
        flexDirection:'column',
        alignItems:'center',
        width: 350,
        height: 300,
        borderWidth: 1,
        borderColor:'black',
        margin: 4, 
    },
    icon: {
        width: 30,
        height:30,
        //tintColor: 'red'
    },
    text:{
        fontSize: 17,
        fontWeight: 'bold',
        color: 'black',
        margin: 3,
    },
    textDes:{
        fontSize: 17,
        color: 'black',
        margin: 2,
    },
    textLike:{
        fontSize: 16,
        fontWeight: 'bold',
        color: 'black',
        margin: 3,
    },
    image:{
        width: 320,
        height: 180,
        resizeMode:'center'
    }
  });
