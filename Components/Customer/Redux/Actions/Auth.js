import * as ActionTypes from './types';
import axios from 'axios';

export const authStart=()=>{
    console.log("authStart")
    return{
        type:ActionTypes.AUTH_START
    };
};

export const authSuccess=(token,userId)=>{
    return{
        type:ActionTypes.AUTH_SUCCESS,
        idToken:token,
        userId:userId
    };
};

export const authFail=(error)=>{
    return{
        type:ActionTypes.AUTH_FAIL,
        error:error
    };
};

export const logout=()=>{
    // localStorage.removeItem('token');
    // localStorage.removeItem('expirationDate');
    // localStorage.removeItem('userId');
    return {
        type:ActionTypes.AUTH_LOGOUT
    }
}

export const authVerify=(email,password)=>{
    console.log(email,password)
    return dispatch=>{
        dispatch(authStart());
        const authVerifyData={
            email:email,
            password:password,
            //returnSecureToken: true
            role: 'Seller'
        };
        console.log(authVerifyData)
        
        let url='https://backend-webapi20190825122524.azurewebsites.net/api/UserAuth/Signup-Seller';
        axios.post(url,authVerifyData)
        .then(response=>{
            console.log("response");
           console.log(response);
            // localStorage.setItem('token',response.data.token);
            // localStorage.setItem('expirationDate',expirationDate);
            // localStorage.setItem('userId',response.data.localId);
            dispatch(authSuccess(response.data.token,response.data.id));
        })
        .catch(err=>{
            console.log("error");
            console.log(err);
            dispatch(authFail(err));
        });
    };
};