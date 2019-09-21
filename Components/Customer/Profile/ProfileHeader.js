import React, {Component} from 'react';
import {Text,View,StyleSheet,Image,Dimensions,AsyncStorage} from 'react-native';
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
          //addressLine1:"baddegama",
          //addressLine2: "baddegama",
          //city: "galle",
          //zipCode: "40",
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

      <View style={styles.topBar}>
        <Icon style={{marginRight: 20, marginTop: 10}}  name='md-log-out'  size={40} color='red'
          onPress={this.onPressSignOut}
        />
      </View>

      <View style={styles.imageBackground} >
        <Image style={styles.image}
          //source={require('../../../Assets/imageProfile.jpg')}
          source={img} 
        />
        <Text style={styles.text}>{this.state.firstName} {this.state.lastName}</Text>
        <Text style={{fontSize:20}}
          onPress={() => this.props.navigation.navigate('Account', this.state)}  
        >
          about me
        </Text>
      </View>

      <Text style={{fontSize:25, color:'black', marginTop: 10}}>
        x
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
    justifyContent: 'flex-start',
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