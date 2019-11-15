import * as ActionTypes from './types';
import axios from 'axios';
import {AsyncStorage} from 'react-native';

export const authStart=()=>{
    return{
        type:ActionTypes.AUTH_START
    };
};

export const checkAuthTImeout=(expirationTime)=>{
    return dispatch=>{setTimeout(()=>{
        dispatch(logout());
    },expirationTime*10000 );
};
};

export const authSuccess=(token,userId,role)=>{
    return{
        type:ActionTypes.AUTH_SUCCESS,
        idToken:token,
        userId:userId,
        
    };
};

export const authFail=(error)=>{
    return{
        type:ActionTypes.AUTH_FAIL,
        error:error
    };
};

export const notVerified=()=>{
    return{
        type:ActionTypes.NOT_VERIFIED,
    };
};

export const correctCode=()=>{
    return{
        type:ActionTypes.CORRECT_CODE,
    };
};

export const enterCodeIsCorrected=()=>{
    console.log("enterCodeIsCorrected")
    return dispatch=>{
        dispatch(correctCode());
    }
}

export const auth=(authData)=>{
    console.log("now in auth")
    console.log(authData)
    return dispatch=>{
        dispatch(authStart());
        let url='';
        console.log(authData.role);
        url='https://backend-webapi20191102020215.azurewebsites.net/api/UserAuth/Signup-Customer';
        axios.post(url,authData)
        .then(response=>{
            if(response.data.id==0)
                dispatch((notVerified()));
            else{
                dispatch(authSuccess(response.data.token,response.data.id,'Customer'));
                //Actions.login();
                AsyncStorage.setItem("userId",response.data.id+"");
                AsyncStorage.setItem("token",response.data.token);
                //AsyncStorage.setItem("expirationDate",expirationDate);
                AsyncStorage.setItem("role",response.data.role);
                AsyncStorage.setItem("firstName", response.data.firstName);
                AsyncStorage.setItem("lastName", response.data.lastName);
                AsyncStorage.setItem("email", authData.LoginVM.Email);
                AsyncStorage.setItem("mobileNumber", response.data.mobileNumber);
                AsyncStorage.setItem("profileImage", response.data.profileImage);

                dispatch(checkAuthTImeout(3600/*response.data.expiresIn*/));
            }
        })
        .catch(err=>{ 
            dispatch(authFail(err));
        });
    }
};

export const logout=()=>{
    AsyncStorage.removeItem("token");
    AsyncStorage.removeItem("expirationDate");
    AsyncStorage.removeItem("userId");
    AsyncStorage.removeItem("firstName")
    AsyncStorage.removeItem("lastName")
    AsyncStorage.removeItem("email")
    AsyncStorage.removeItem("profileImage")
    AsyncStorage.removeItem("mobileNumber")
    // localStorage.removeItem('token');
    // localStorage.removeItem('expirationDate');
    // localStorage.removeItem('userId');
    return {
        type:ActionTypes.AUTH_LOGOUT
    }
}

export const authVerify=(email,password)=>{
    // dispatch.authVerify(email,password);
    return dispatch=>{
        dispatch(authStart());
        const authVerifyData={
            Email:email,
            Password:password,
            returnSecureToken: true
        };
        
        let url='https://backend-webapi20191102020215.azurewebsites.net/api/UserAuth/signin';
        axios.post(url,authVerifyData)
        .then(response=>{
            console.log("response");
            console.log(response.data);
            const expirationDate=new Date(new Date().getTime()+/*response.data.expiresIn*/3600*10000);

            if(typeof response.data === 'string')
                dispatch(authFail(response.data));
            else if(response.data===false)
                dispatch((notVerified()));
            else if(response.data.data.id==0)
                dispatch((notVerified()));
            else if(response.data.role==='Customer'){
                (dispatch(authSuccess(response.data.data.token,response.data.data.id,response.data.role)));
                
                AsyncStorage.setItem("userId",response.data.data.id+"");
                AsyncStorage.setItem("token",response.data.data.token);
                AsyncStorage.setItem("expirationDate",expirationDate);
                AsyncStorage.setItem("role",response.data.role);
                AsyncStorage.setItem("firstName", response.data.data.firstName);
                AsyncStorage.setItem("lastName", response.data.data.lastName);
                AsyncStorage.setItem("email",email);
                AsyncStorage.setItem("mobileNumber", response.data.data.mobileNumber);
                AsyncStorage.setItem("profileImage", response.data.data.profileImage);
            } else
                window.alert(response.data.message)
             
            // localStorage.setItem('expirationDate',expirationDate);
            // localStorage.setItem('userId',response.data.localId);
            // dispatch(authSuccess(response.data.token,response.data.id));
        })
        .catch(err=>{
            //window.alert(err.message==="Network Error" ? "no network" : "email or password incorrect" )
            console.log(err);
            dispatch(authFail(err.message));
        });
    };
};



export const authCheckState=()=>{
    return dispatch=>{

        let userId;
        AsyncStorage.getItem("userId").then((value) => {
            userId=value;
            console.log("userId");
            console.log(userId);
            }).done();
            //AsyncStorage.setItem("userId",userId+"");

        let token;
        AsyncStorage.getItem("token").then((value) => {
            token=value;
            console.log(token);
            }).done();
        
        let role;
        AsyncStorage.getItem("role").then((value) => {
            console.log('role'+value);
            role=value;
        //this.setState({"role": value});
        }).done();
        const sleep = ms => new Promise(resolve => setTimeout(resolve, ms))
        sleep(1000).then(() => {
        if(!token && !userId){
            console.log("error dispatching");
            dispatch(logout());
        }
        else{
                dispatch(authSuccess(token,userId,role));
            }
        })
    }
};
