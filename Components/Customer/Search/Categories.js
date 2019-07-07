import React, {Component} from 'react';
import {
  Text, View, StyleSheet, Image, ScrollView, Dimensions, FlatList, Platform, TouchableOpacity     
} from 'react-native';
import {CategoriesData} from '../Home/Data';

class VirticalFlatListItem extends Component{
    render(){
        return(
          <TouchableOpacity>
            <View style={{flexDirection:'row'}}>
              <Image style={styles.image} source={require('../../../Assets/food.jpg')} />
              <Text style={styles.text}>{this.props.item.name}</Text>
            </View>
          </TouchableOpacity>
        );
    }
}

export default class Categories extends Component {

    render () {
    return (
    <ScrollView>
    <View style={styles.container}>
        <View>
        <FlatList style={{backgroundColor: "white", opacity: 1, flex:1}}

            //numColumns = {3 }
            virtical={true}
            data={CategoriesData}
            renderItem={({item, index}) => {
                    return (
                    <VirticalFlatListItem item={item} index={index} parentFlatList={this}>
                
                    </VirticalFlatListItem>
                )
            }}
            keyExtractor={(item, index) => item.name}
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
      marginTop: 20
  }
});
