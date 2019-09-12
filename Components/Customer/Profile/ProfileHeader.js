import React, {Component} from 'react';
import {Text,View,StyleSheet,Image,Dimensions} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import {logout} from '../Redux/Actions/Auth';
import {connect} from 'react-redux';
import SignIn from '../../SignIn/SignIn'

class ProfileHeader extends Component {
  constructor(props){
    super(props);
    this.state={
        user: {
          firstName:"wathsala",
          lastName:"Danthasinghe",
          email: "wathdanthasinghe@gmail.com",
          addressLine1:"baddegama",
          addressLine2: "baddegama",
          city: "galle",
          zipCode: "40",
          profileImage: "",
          mobileNumber: "0716325124",
        }
    }
  }

    onPressSignOut=()=>{// is Successed==true
      alert("signOut");
      this.props.logout();  //now isSuccessed if false
    }
    
    render () {
    if(this.props.isSuccessed===false)
      return(<SignIn/>);
    else
    return (
      <View style={styles.container} > 

        <View style={styles.topBar}>
          <Icon style={{marginRight: 20, marginTop: 10}}  name='md-log-out'  size={40} color='red'
            onPress={this.onPressSignOut}
          />
        </View>

        <View style={styles.imageBackground} >
          <Image style={styles.image}
            source={require('../../../Assets/imageProfile.jpg')}
          />
          <Text style={styles.text}>{this.state.user.firstName} {this.state.user.lastName}</Text>
          <Text style={{fontSize:20}}
            onPress={() => this.props.navigation.navigate('Account', this.state.user)}  
          >
            about me
          </Text>
        </View>

        <Text style={{fontSize:25, color:'black', marginTop: 10}}>
          My Orders
        </Text>

      </View>
    );
  }
}

export default connect(null,{logout})(ProfileHeader);

const widthScreen=Dimensions.get('window').width;
const heightScreen=Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //flexDirection: 'column',
    //justifyContent: '',
  },
  topBar:{
    flexDirection: 'row',
    backgroundColor: 'gainsboro',
    justifyContent: 'flex-end',
    height: 50,
    width:widthScreen
  },
  icon: {
    width: 40,
    height:40,
    tintColor: 'red'
  },
  image:{
    width: 110,
    height: 110,
    borderRadius: 55,
    //marginTop: 70
  },
  imageBackground:{
    alignItems: 'center',
    width: widthScreen,
    height: 200,
    width:widthScreen,
    backgroundColor: 'gainsboro'
  },
  text:{
    fontSize: 22,
    color: 'black',
    marginTop: 20,
  },
});