import React, {Component} from 'react';
import {Text,View,StyleSheet,TextInput,Image,TouchableOpacity,Alert,Linking,KeyboardAvoidingView} from 'react-native';
import {connect} from 'react-redux';
import * as actions from '../Customer/Redux/Actions/index';
import {Field,reduxForm} from 'redux-form';
//import submit from './submit';
import {authVerify, authCheckState} from '../Customer/Redux/Actions/Auth';
import CustomerTab from '../Customer/Tab/Tab';
import SignUp from './SignUp';

const renderField=({keyboardType,placeholder,secureTextEntry, meta:{touched,error,warning},input:{onChange, ...restInput}})=>{
    return(<View style={{flexDirection:'column',height:70,alignItems:'flex-start'}}>
       <View style={{flexDirection:'row',height:50,alignItems:'center'}}>
           <TextInput style={styles.Input} keyboardType={keyboardType} placeholder={placeholder} secureTextEntry={secureTextEntry} onChangeText={onChange} {...restInput}/>
       </View>
        {touched && ((error && <Text style={{color:'red'}}>{error}</Text>) /*|| 
                    (warning && <Text style={{color:red}}>{warning}</Text>)*/) }
       </View>
    );
}
const required=value=> value ? undefined:'Required';
const isValidEmail=value=> value && !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(value) ? 'Invalid email address':undefined;


class ContactForm extends Component{
    constructor(props) {
        super(props);
        this.state = {
            signUp: false
        }
    }

    componentDidMount(){
        this.props.authCheckState();
    }

    handleRegister=()=>{
        Alert.alert(
            'Register ? ',
            'For register pls visit our site, Press OK',
            [
              {text: 'Ask me later', onPress: () => console.log('Ask me later Pressed'),},
              {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style:'cancel'},
              {text: 'OK', onPress: () => { Linking.openURL('https://www.google.com')}},
            ],
            { cancelable: false }
          )
    }

    submit=(values)=> {
        this.props.authVerify(values.Email,values.Password)
        window.alert(`You submitted:\n\n${JSON.stringify(values, null, 2)}`)
        console.log(values);
    }

    render(){
        const {submitting,handleSubmit,onSubmit}=this.props;
        if(this.props.auth.isSuccessed ){
            console.log("this.props.auth.isSuccessed"+this.props.auth.isSuccessed)
            return(<CustomerTab/>);
        }
        else if(this.state.signUp===true)
            return(<SignUp/>);
        else
        return(
            <KeyboardAvoidingView style={styles.container} behavior='position'>
                <View style={{alignItems:"center"}}>
                    {/*<Image source={require('../../Assets/logo.png')} style={{width:'70%',height:80,marginTop:10,marginRight:'5%',borderRadius:15}}/>*/}
                    <Text style={{fontSize: 70,color: '#26bf63',fontWeight:'400', marginTop: '65%', fontWeight:'bold', }}>
                        shop
                        <Text style={{color: '#5189c9',}}>
                            Me
                        </Text>
                    </Text>
                    
                    
                    <Text style={{fontSize:25,color:"black",paddingTop:'0%',paddingBottom:'15%'}}></Text>
                    <Field name="Email" keyboardType="email-address" placeholder='Email' component={renderField} 
                        validate={[required,isValidEmail]}
                    />
                    <Field name="Password" keyboardType='default' placeholder='Password' secureTextEntry={true} component={renderField}
                        validate={[required]} 
                    />
                    <TouchableOpacity disabled={submitting} onPress={handleSubmit(this.submit)} style={{margin:5,alignSelf:'stretch', height: 65}}>{/* onPress={handleSubmit(submit)} */}
                        <Text style={{
                            backgroundColor:'black',color:'white',fontSize:20,
                            height:37,width:'100%',textAlign:'center',padding:5
                        }}>Log In</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={()=>{this.setState({signUp: true})}} style={{}}>
                        <Text style={{fontSize:18,textAlign:'center',padding:5
                        }}>new to shopMe ? create an account</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        );
    }
}
const SignIn=reduxForm({
    form:'Signin',
})(ContactForm)

const mapStateToProps=state=>{
    console.log("state")
    console.log(state)
    return {
      auth: state.auth,
    };
}

export default connect(mapStateToProps,{
    authVerify, authCheckState
  })(SignIn);

const styles=StyleSheet.create({
    container: {
        backgroundColor:"white",
        flex: 1,
        flexDirection: 'column',
        alignItems: 'stretch',
      },
    backgroundImage: {
        flex:1,
        alignSelf: 'stretch',
        width: null, // or 'stretch'
    },
    Input:{
        backgroundColor:"white",
        width:'95%',
        height:45,
        //borderWidth:1,
        borderBottomWidth: 1,
        borderRadius:2,
        borderColor:'black',
        shadowColor:'#000',
        shadowOffset:{width:0,height:2,},
        shadowOpacity:0.1,
        elevation:1,
        marginLeft:5,
        marginRight:5,
        marginTop:5,
    }
});