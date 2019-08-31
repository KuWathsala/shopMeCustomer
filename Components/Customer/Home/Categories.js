import React, {Component} from 'react';
import {
  Text, View, StyleSheet, Image, ScrollView, Dimensions, FlatList, Platform, TouchableOpacity     
} from 'react-native';
//import {CategoriesData} from './Data';
import axios from 'axios';
import {Products} from  '../../Menu/screenNames';

class VirticalFlatListItem extends Component{
  constructor(props){
    super(props);
  }

  render(){
      return(
        <TouchableOpacity>  
          <View style={{flexDirection:'row'}}>
            <Image style={styles.image} source={{uri: this.props.item.image}} />
            <Text style={styles.text}>{this.props.item.categoryName}</Text>
          </View>
        </TouchableOpacity>
      );
  }
}

export default class Categories extends Component {
  constructor(props){
    super(props);
    this.state={
      categoriesData: null
    }
  }

    render () {
    return (
    <ScrollView>
    <View style={styles.container}>
        <View>
        <FlatList style={{backgroundColor: "white", opacity: 1, flex:1}}

            //numColumns = {3 }
            virtical={true}
            data={this.state.categoriesData}
            renderItem={({item, index}) => {
                    return (
                    <VirticalFlatListItem item={item} navigation={this.props.navigation}
                     index={index} parentFlatList={this}>
                
                    </VirticalFlatListItem>
                )
            }}
            keyExtractor={(item, index) => item.id.toString()}
        /> 
        </View>
    </View>
    </ScrollView>
    );
  }
}

const widthScreen=Dimensions.get('window').width;
const heightScreen=Dimensions.get('window').height;

const styles = StyleSheet.create({
  
  container: { 
      flex: 1,
      flexDirection:'column',
      marginTop: Platform.OS==='ios' ? 34 : 0,
      width: '100%',
      //alignItems: 'center'
  },
  listItem: {
      //flex: 1,
      //flexDirection:'column',
      //alignItems:'center',
      height: '300',
      width: '200',
      //borderWidth: 1,
      //borderColor:'black',
      //margin: 4,
  },
  icon: {
      width: 30,
      height:30,
  },
  text:{
      fontSize: 16,
      //fontWeight: 'bold',
      color: 'black',
      marginLeft: 10,
      margin: 40,
      alignItems:'center'
  },
  image:{
      width: 60,
      height: 60,
      marginLeft: 20,
      marginTop: 20,
      borderColor: 'black'
  }
});
