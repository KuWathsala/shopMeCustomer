import React, {Component} from 'react';
import {Text, View, StyleSheet, TouchableOpacity ,TextInput, KeyboardAvoidingView} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import { SearchItems, Map } from '../../Menu/screenNames';
import Categories from './Categories';

export default class SearchHeader extends Component {
  static navigationOptions = { header: null };

  constructor(props){
    super(props);
    this.state={
      searchText: null
    }
  }

  render () {
    return (
      <View style={{flex: 1,flexDirection:'column'}}>
        <View style={styles.containerOut}>
          <View style={styles.container}>

            <TouchableOpacity style={{marginLeft: 10, marginTop: 10}}
              onPress={() =>this.props.navigation.navigate(Map) }  
            >
              <Icon name="ios-pin" size={40} color="#593196" />
            </TouchableOpacity>

            <View style={styles.content}>
              <TextInput style={styles.serchText} placeholder="  search for product" onChangeText={(x) => this.setState({ searchText: x })}  value={this.state.searchText} ></TextInput> 
            </View>
          
            <TouchableOpacity style={{marginRight: 10, marginTop: 10}}
              onPress={() =>this.props.navigation.navigate(SearchItems, this.state) }  //this.props.navigation.navigate(SearchItems)
            >
              <Icon name="ios-search" size={45} color="#593196" />
            </TouchableOpacity>

          </View>
        </View>

        <Categories />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  containerOut: {
    height:70
  },
  container: {
    flexDirection: "row",
    width: "100%",
  },
  content: {
    flex: 1,
    flexDirection: "column",
  },
  comItem: {
    marginLeft: 10,
    marginTop:10,
  },
  icon: {
    width: 30,
    height:30,
  },
  serchText: {
    marginRight: 5,
    fontSize: 20,
    marginLeft: 10,
    marginTop: 10,
    padding: 5,
    paddingLeft:10,
    borderColor: '#593196',
    borderWidth: 1,
    borderRadius: 20,
    
  },
});
