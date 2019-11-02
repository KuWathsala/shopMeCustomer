import React, {Component} from 'react';
import {Text,View,StyleSheet,Button,Image, Dimensions, TouchableOpacity, TextInput, Alert, AsyncStorage} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import {Field,reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import axios from 'axios';

class Edit extends Component {

  constructor(props){
    super(props);
    this.state={
        user: {
          id: null,
          firstName:null,
          lastName:null,
          profileImage: null,
          mobileNumber: null
        },
    }
  }

  componentDidMount(){
    console.log("id=====>"+parseInt(this.props.navigation.getParam('id', '0')),)
    this.setState({
      user:{
        id: this.props.navigation.getParam('id', '-'),
        firstName:this.props.navigation.getParam('firstName', '-'),
        lastName:this.props.navigation.getParam('lastName', '-'),
        profileImage: this.props.navigation.getParam('profileImage'),
        mobileNumber: this.props.navigation.getParam('mobileNumber', '-')
      }
    })
    alert(this.state.user.id)
  }

  submit=(values)=> {
    
    let customerData ={
      id: parseInt(this.state.id),
      firstName: values.firstName,
      lastName: values.lastName,
      mobileNumber: values.mobileNumber
    }

    alert(customerData.id)
    window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`)

    if(customerData.firstName!=null || customerData.lastName!=null || customerData.mobileNumber!=null)
      axios.post('https://backend-webapi20191102020215.azurewebsites.net/api/userauth/Update-customer', customerData) //https://backend-webapi20190825122524.azurewebsites.net/api/orders/createNewOrder${order}
        .then(response=>{
            this.props.navigation.navigate('ProfileHeader', response.data)
        }) 
        .catch (error=>{
          Alert.alert("update failed")
          this.props.navigation.navigate('ProfileHeader', response.data)
      })
  }


  render () {
    const {submitting,handleSubmit,onSubmit}=this.props;
    let img= (this.state.user.profileImage===null) ? require('../../../Assets/imageProfile.jpg') : {uri: this.state.profileImage};
    return (
        <View style={styles.container} >

        <View style={styles.imageBackground} >
          <Image style={styles.image}
            source={img} 
          />
        </View>

        <Text style={styles.text}>first name</Text>
        <Field name="firstName" keyboardType="default" placeholder={this.state.user.firstName} component={renderField} />

        <Text style={styles.text}>last name</Text>
        <Field name="lastName" keyboardType="default" placeholder={this.state.user.lastName} component={renderField} />
        
        <Text style={styles.text}>mobile number</Text>
        <Field name="mobileNumber" keyboardType="numeric" placeholder={this.state.user.mobileNumber} component={renderField} />

        <TouchableOpacity disabled={submitting} onPress={handleSubmit(this.submit)} style={{alignSelf:'stretch', height: 70, bottom: -30, position: 'absolute', width: '100%'}}>
            <Text style={styles.save}>save</Text>
        </TouchableOpacity>

        </View>
    );
  }
}

const EditProfile=reduxForm({form:'EditProfile'})(Edit)

export default connect()(EditProfile);

const widthScreen=Dimensions.get('window').width;
const heightScreen=Dimensions.get('window').height;

const renderField=({keyboardType,placeholder,secureTextEntry, meta:{touched,error,warning},input:{onChange, ...restInput}})=>{
  return(<View style={{flexDirection:'column',height:70,alignItems:'flex-start'}}>
          <View style={{flexDirection:'row',height:50,alignItems:'center'}}>
              <TextInput style={styles.field} keyboardType={keyboardType} placeholder={placeholder} secureTextEntry={secureTextEntry} onChangeText={onChange} {...restInput}/>
        </View>
      {touched && ((error && <Text style={{color:'red'}}>{error}</Text>) /*|| 
                  (warning && <Text style={{color:red}}>{warning}</Text>)*/) }
     </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //flexDirection: 'column'
  },
  imageBackground:{
    alignItems: 'center',
    width: widthScreen,
    //height: 200,
    width:widthScreen,
    //backgroundColor: 'gainsboro'
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
    marginTop: 60
  },
  text:{
    fontSize: 20, 
    color:'black', 
    marginTop: 20, 
    marginLeft: 20
  },
  field:{
    fontSize: 25, 
    marginLeft: 30
  },
  save:{
    backgroundColor:'black',
    color:'white',
    fontSize:23,
    height:40,
    width:'100%',
    textAlign:'center',
    padding:5,
  }
});