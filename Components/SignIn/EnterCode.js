import React, {Component} from 'react';
import {Text,View,StyleSheet,TextInput,Image,TouchableOpacity,Alert,Linking,KeyboardAvoidingView, ActivityIndicator} from 'react-native';
import {connect} from 'react-redux';
import * as actions from '../Customer/Redux/Actions/index';
import {Field,reduxForm} from 'redux-form';
//import submit from './submit';
import {authVerify, authCheckState} from '../Customer/Redux/Actions/Auth';
import CustomerTab from '../Customer/Tab/Tab';
import SignUp from './SignUp';
import axios from 'axios';

const renderField=({keyboardType,placeholder,secureTextEntry, meta:{touched,error,warning},input:{onChange, ...restInput}})=>{
    return(
            <View style={{flexDirection:'column',height:100,alignItems:'flex-start', marginTop: '20%'}}>
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

class EnterCodeForm extends Component{
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
            isValidCode: false,
            text: ''
        }
    }

    componentDidMount(){
        console.log("Entercode")
    }

    submit=(values)=> {
        this.setState({loading: true})
        axios.post(`https://backend-webapi20191102020215.azurewebsites.net/api/UserAuth/verify/${values.code}`)
        .then(response=>{
            console.log(response)
            this.setState({isValidCode: response.data})
            this.setState({loading: false, text: !isValidCode ? "your code is invalid" : ""});
        })
        .catch(error=>{
            this.setState({loading: false, text: "something went wrong...try again"});
        })
    }

    render(){
        const {submitting,handleSubmit,onSubmit}=this.props;
        if(this.state.isValidCode===true ){
            console.log("this.state.isValidEmail  "+this.state.isValidCode)
            return(<CustomerTab />);
        } 
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
                    
                    <Text style={{fontSize: 20, marginTop: '3%'}}>your security code has been sent to email account
                    </Text>
                    
                    <View>
                        <Field name="code" keyboardType="default" placeholder='CODE' component={renderField} 
                            validate={[required]}
                        />
                        <TouchableOpacity disabled={this.state.loading} onPress={handleSubmit(this.submit)} style={{margin:5,alignSelf:'stretch', height: 65}}>{/* onPress={handleSubmit(submit)} */}
                            <Text style={styles.submit}>Next</Text>
                        </TouchableOpacity>

                        {<Text style={{ fontSize: 18, color: 'red', alignSelf:'center'}}>{this.state.text}</Text>}

                        {
                            (this.state.loading) ? <ActivityIndicator color="black" size="large" style={styles.activityIndicator}/>: <View></View>
                        }
                    </View>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const EnterCode=reduxForm({
    form:'EnterCodeForm',
})(EnterCodeForm)

const mapStateToProps=state=>{
    return {
      auth: state.auth,
    };
}

export default connect(mapStateToProps,{
    authVerify, authCheckState
  })(EnterCode);


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