import React, {Component} from 'react';
import {Text,View,StyleSheet,TextInput,Image,TouchableOpacity,Alert,Linking,KeyboardAvoidingView, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import * as actions from '../Customer/Redux/Actions/index';
import {Field,reduxForm} from 'redux-form';
//import submit from './submit';
import {authVerify, authCheckState} from '../Customer/Redux/Actions/Auth';
import CustomerTab from '../Customer/Tab/Tab';
import axios from 'axios';
import SignIn from './SignIn';
import { baseURL } from '../Base';

const renderField=({keyboardType,placeholder,secureTextEntry, meta:{touched,error,warning},input:{onChange, ...restInput}})=>{
    return(
            <View style={{flexDirection:'column',height:100,alignItems:'flex-start', marginTop: '0%'}}>
                <View style={{flexDirection:'row',height:80,alignItems:'center'}}>
                    <TextInput style={styles.Input} keyboardType={keyboardType} placeholder={placeholder} secureTextEntry={secureTextEntry} onChangeText={onChange} {...restInput}/>
                </View>
                {touched && ((error && <Text style={{color:'red'}}>{error}</Text>) /*|| 
                            (warning && <Text style={{color:red}}>{warning}</Text>)*/) }
            </View>
    );
}
const required=value=> value ? undefined:'Required';
const isValidEmail=value=> value && !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i.test(value) ? 'Invalid email address':undefined;
const isValidPassword=value=> value && !/^(?=.{10,}$)(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*\W).*$/i.test(value) ? 'Required UPPERCASE, lowercase, digit, symbol and minimum 10 characters ':undefined;
const passwordMatch=(value,allValues)=> value!==allValues.password ? 'Passwords do not Match':undefined;

class ForgetPasswordForm extends Component{
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            sendEmail: false,
            codeSubmit: false,
            submitNewPassword: null,
            email: '',
            text: '',
        }
    }

    componentDidMount(){
        console.log("ForgetPasword")
    }

    submitEmail=(values)=> {
        this.setState({loading: true, email: values.email})
        axios.post(`${baseURL}/api/UserAuth/forgetPassword/${values.email}`)
        .then(response=>{
            this.setState({sendEmail: response.data})
            this.setState({loading: false,  text: (!response.data) ? "email is not valid. ": ""});
        })
        .catch(error=>{
            alert(error);
            this.setState({loading: false, text: error.message});
        })
    }

    submitCode=(values)=> {
        this.setState({loading: true})
        axios.post(`${baseURL}/api/UserAuth/verify/${values.code}`)
        .then(response=>{
            console.log(response)
            this.setState({codeSubmit: response.data})
            console.log("this.state.codeSubmit "+this.state.codeSubmit)
            this.setState({loading: false, text: !response.data ?  "your code is invalid" : ""});
        })
        .catch(error=>{
            console.log(error);
            this.setState({loading: false, text: error.message});
        })
    }

    submitPassword=(values)=> {
        this.setState({loading: true})

        let loginVM={
            email: this.state.email,
            password: values.password
        }

        axios.post(`${baseURL}/api/UserAuth/resetPassword/`, loginVM)
        .then(response=>{
            console.log(response)
            this.setState({submitNewPassword: response.data})
            this.setState({loading: false, text: response.data==null ? "something went wrong...try again" : ""});
        })
        .catch(error=>{
            console.log(error);
            this.setState({loading: false, text: error.message});
        })
    }

    render(){
        const {submitting,handleSubmit,onSubmit}=this.props;
        //let viewEmail=<View><Field name="email" keyboardType="email-address" placeholder='Email' component={renderField} validate={[required,isValidEmail]} /> <TouchableOpacity disabled={this.state.loading} onPress={handleSubmit(this.submitCode)} style={{margin:5,alignSelf:'stretch', height: 65}}><Text style={styles.submit}>Next</Text></TouchableOpacity></View>
        let viewEmail=<View>
                            <Field name="email" keyboardType="email-address" placeholder='Email' component={renderField} validate={[required,isValidEmail]} /> 
                            <TouchableOpacity disabled={this.state.loading} onPress={handleSubmit(this.submitEmail)} style={{margin:5,alignSelf:'stretch', height: 65}}>
                                <Text style={styles.submit}>Next</Text>
                            </TouchableOpacity>
                        </View>
                        
        let viewCode=<View>
                        <Field name="code" keyboardType="default" placeholder='CODE' component={renderField} validate={[required]} /> 
                            <TouchableOpacity disabled={this.state.loading} onPress={handleSubmit(this.submitCode)} style={{margin:5,alignSelf:'stretch', height: 65}}>
                                <Text style={styles.submit}>Next</Text>
                            </TouchableOpacity>
                        </View>

        let viewResetPassword = <View>
                                    <Field name="password" keyboardType='default' placeholder='Password' secureTextEntry={true} component={renderField} validate={[required,isValidPassword]}  />
                                    <Field name="confirmPassword" keyboardType='default' placeholder='Confirm Password' secureTextEntry={true} component={renderField} validate={[required,passwordMatch]} />
                                    
                                    <TouchableOpacity disabled={this.state.loading} onPress={handleSubmit(this.submitPassword)} style={{margin:5,alignSelf:'stretch', height: 65}}>
                                        <Text style={styles.submit}>Next</Text>
                                    </TouchableOpacity>
                                </View>
        if(this.state.submitNewPassword !=null)
            return (<SignIn />);
        else return(
            <KeyboardAvoidingView style={styles.container} behavior='position'>
                <View style={{alignItems:"center"}}>
                    {/*<Image source={require('../../Assets/logo.png')} style={{width:'70%',height:80,marginTop:10,marginRight:'5%',borderRadius:15}}/>*/}
                    <Text style={{fontSize: 70,color: '#26bf63',fontWeight:'400', marginTop: '65%', fontWeight:'bold', }}>
                        shop
                        <Text style={{color: '#5189c9',}}>
                            Me
                        </Text>
                    </Text>
                    <Text style={{fontSize: 20, marginTop: '3%'}}>reset your password</Text>

                    {(this.state.codeSubmit) ? viewResetPassword : (this.state.sendEmail) ? viewCode : viewEmail  }
        
                    {<Text style={{ fontSize: 18, color: 'red', alignSelf:'center'}}>{this.state.text}</Text>}

                    <Text style={{ fontSize: 16, color: 'black', alignSelf:'center'}} onPress={()=>this.setState({submitNewPassword: ''})} >
                        go back to Signin
                    </Text>

                    {/*<TouchableOpacity onPress={()=>{this.setState({signUp: true})}} style={{}}>
                        <Text style={{fontSize:18,textAlign:'center',padding:5
                        }}>resend code...</Text>
                    </TouchableOpacity>*/}
                    {
                        (this.state.loading) ? <ActivityIndicator color="black" size="large" style={styles.activityIndicator}/>: <View></View>
                    }
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const ForgetPassword=reduxForm({
    form:'ForgetPassword',
})(ForgetPasswordForm)

const mapStateToProps=state=>{
    return {
      auth: state.auth,
    };
}

export default connect(mapStateToProps,{
    authVerify, authCheckState
  })(ForgetPassword);


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
        fontSize: 22,
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
    },
    submit: {
        backgroundColor:'black',
        color:'white',
        fontSize:25,
        height:40,
        width:'100%',
        textAlign:'center',
        padding:5,
    },
    activityIndicator:{
        marginTop: '10%'
    }
});