import React, {Component} from 'react';
import {Text,View,StyleSheet,Image,Dimensions,AsyncStorage, TouchableOpacity} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import {logout} from '../Redux/Actions/Auth';
import {connect} from 'react-redux';
import SignIn from '../../SignIn/SignIn';

class ProfileHeader extends Component {
  constructor(props){
    super(props);
    this.state={
          firstName: null,
          lastName: null,
          email: null,
          profileImage: null,
          mobileNumber: null,
    }
  }

  componentDidMount(){
    AsyncStorage.getItem("firstName").then(x=>this.setState({firstName: x})).done();
    AsyncStorage.getItem("lastName").then(x=>this.setState({lastName: x})).done();
    AsyncStorage.getItem("email").then(x=>this.setState({email: x})).done();
    AsyncStorage.getItem("profileImage").then(x=>this.setState({profileImage: x})).done();
    AsyncStorage.getItem("mobileNumber").then(x=>this.setState({mobileNumber: x})).done();
  }

  onPressSignOut=()=>{// is Successed==true
    //alert("signOut");
    this.props.logout();  //now isSuccessed if false
  }
  
  render () {
    let img= (this.state.profileImage===null) ? require('../../../Assets/imageProfile.jpg') : {uri: this.state.profileImage};
  if(this.props.isSuccessed===false)
    return(<SignIn/>);
  else
  return (
    <View style={styles.container} > 

      <View style={styles.imageBackground} >
        <Image style={styles.image}
          //source={require('../../../Assets/imageProfile.jpg')}
          source={img} 
        />
        <Text style={styles.text}>{this.state.firstName} {this.state.lastName}</Text>
        <Text style={{fontSize:22, color: 'blue'}}
          onPress={() => this.props.navigation.navigate('EditProfile', this.state)}  
        >
          edit profile
        </Text>
      </View>

      <Text style={{fontSize:25, color:'black', marginTop: 30, marginLeft: 20}}>
        mobile number:  <Text>{this.state.mobileNumber}</Text> 
      </Text>
      <Text style={{fontSize:25, color:'black', marginLeft: 20, marginTop: 10}}>
        email:  <Text>{this.state.profileImage}</Text>
      </Text>

      <TouchableOpacity  onPress={this.onPressSignOut}>
        <Text style={{marginLeft: 20, marginTop: 50, fontSize: 20, color: 'red'}} >Sign out</Text>
      </TouchableOpacity>
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
    justifyContent: 'flex-start',
    width:widthScreen
  },
  icon: {
    width: 40,
    height:40,
    tintColor: 'red'
  },
  image:{
    width: 150,
    height: 150,
    borderRadius: 75,
    marginTop: '10%'
  },
  imageBackground:{
    alignItems: 'center',
    width: widthScreen,
    //height: 200,
    width:widthScreen,
    //backgroundColor: 'gainsboro'
  },
  text:{
    fontSize: 26,
    color: 'black',
    marginTop: 4,
  },
});