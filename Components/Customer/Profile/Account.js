import React, {Component} from 'react';
import {Text,View,StyleSheet,Button,Image, Dimensions} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";

export default class Account extends Component {

  constructor(props){
    super(props);
    this.state={
        user: {
          firstName:this.props.navigation.getParam('firstName', '-'),
          lastName:this.props.navigation.getParam('lastName', '-'),
          profileImage: this.props.navigation.getParam('profileImage', '-'),
          mobileNumber: this.props.navigation.getParam('mobileNumber', '-')
        },
    }
  }

    render () {
    return (
        <View style={styles.container} > 
          <View style={styles.topBar}>
            <Image style={styles.image}
              source={require('../../../Assets/imageProfile.jpg')}
            />
            <Text style={styles.text}>{this.state.user.firstName} {this.state.user.lastName}</Text>
          </View>

          <View>
          <Text style={styles.text}>email: {this.state.user.email} </Text>
          <Text style={styles.text}>Mobile Number: {this.state.user.mobileNumber}</Text>
          </View>
        </View>
    );
  }
}

const widthScreen=Dimensions.get('window').width;
const heightScreen=Dimensions.get('window').height;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    //flexDirection: 'column',
    //justifyContent: '',
  },
  topBar:{
    alignItems: 'flex-start',
    flexDirection: 'row',
    //backgroundColor: 'gainsboro',
    justifyContent: 'flex-start',
    margin: 10,
    height: 100,
    width:widthScreen
  },
  icon: {
    width: 40,
    height:40,
    tintColor: 'red'
  },
  image:{
    width: 60,
    height: 60,
    borderRadius: 30,
    marginTop: 20
  },
  text:{
    fontSize: 22,
    color: 'black',
    marginTop: 20,
    marginLeft: 30,
},
});