import React, {Component} from 'react';
import {Text,View,StyleSheet,Button,Image, Dimensions, TouchableOpacity, TextInput, Alert, AsyncStorage} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import {Field,reduxForm} from 'redux-form';
import {connect} from 'react-redux';
import axios from 'axios';
import ImagePicker from 'react-native-image-picker';
import { baseURL } from '../../Base';

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
        imgurl: null
    }
  }

  componentDidMount(){
    this.setState({
      user:{
        id: this.props.navigation.getParam('id', 0),
        firstName:this.props.navigation.getParam('firstName', '-'),
        lastName:this.props.navigation.getParam('lastName', '-'),
        profileImage: this.props.navigation.getParam('profileImage'),
        mobileNumber: this.props.navigation.getParam('mobileNumber', '-')
      }
    })
  }

  chooseFile = () => {
    let options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    ImagePicker.showImagePicker(options, response => {
      console.log('Response = ', response);
 
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
        alert(response.customButton);
      } else {
        const formData = new FormData();
        formData.append("file",{uri:response.uri,type:response.type,name:response.fileName});
        formData.append('api_key', 'N0iPhJFusPjArpBfPbui9j8MkEs');
        formData.append("upload_preset", 'm0uhbhzz');
        axios.post('https://api.cloudinary.com/v1_1/dubnsitvx/image/upload',formData,{
        onUploadProgress: ProgressEvent=>{
        console.log('Upload Progress:'+Math.round(ProgressEvent.loaded / ProgressEvent.total*100 )+'%')
    }
    })
    .then(res=>{
        console.log(res)
        console.log(res.data.url);
        this.setState({imgurl: res.data.url})
    })
    .catch(err=>{
        console.log(err)
    });
          }
    })    
  };

  submit=(values)=> {
    
    let customerData ={
      id: parseInt(this.state.user.id),
      firstName: values.firstName,
      lastName: values.lastName,
      mobileNumber: values.mobileNumber,
      profileImage: values.imgurl
    }

    console.log(customerData)
    console.log(this.state.user)

    window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`)

    if(customerData.firstName!=null || customerData.lastName!=null || customerData.mobileNumber!=null)
      axios.post(`${baseURL}/api/UserAuth/Update-Customer`, customerData) //https://backend-webapi20190825122524.azurewebsites.net/api/orders/createNewOrder${order}
        .then(response=>{
          console.log(response)
          AsyncStorage.removeItem("firstName");
          AsyncStorage.removeItem("lastName");
          AsyncStorage.removeItem("mobileNumber");
          AsyncStorage.setItem("firstName", response.data.firstName);
          AsyncStorage.setItem("lastName", response.data.lastName);
          AsyncStorage.setItem("mobileNumber", response.data.mobileNumber);
          this.props.navigation.navigate('ProfileHeader')
        }) 
        .catch (error=>{
          Alert.alert("update failed")
          console.log(error)
          this.props.navigation.navigate('ProfileHeader')
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

        <TouchableOpacity onPress={this.chooseFile.bind(this)}>
          <Text>tap to change image</Text>
        </TouchableOpacity>

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