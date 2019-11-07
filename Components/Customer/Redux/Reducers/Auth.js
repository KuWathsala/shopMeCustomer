import * as actionTypes from '../Actions/types';
import {updateObject} from '../utility';

const initialState={
    token:null,
    userId:null,
    error:null,
    loading:false,
    userType:null,
    isSuccessed: false, //update
    isVerified: true
}
const authstart =(state,action)=>{
    return updateObject(state,{error:null,loading:true, isSuccessed: false})
}

const authSuccess=(state,action)=>{
    return updateObject(state,{error:null,
        token:action.idToken,
        userId:action.userId,
        error:null,
        loading:false,
        isSuccessed: true   //update
    })
}

const notVerified=(state,action)=>{
    return updateObject(state,{loading:false, isSuccessed: false, isVerified: false })
}

const authfail=(state,action)=>{
    return updateObject(state,{error:action.error,loading:false, isSuccessed: false })
}

const authLogout=(state,action)=>{
    return updateObject(state,{token:null,userId:null, isSuccessed: false});
}

const reducer =( state=initialState,action)=>{
    switch(action.type){
        case actionTypes.AUTH_START:return authstart(state,action)
        case actionTypes.AUTH_SUCCESS:return authSuccess(state,action)
        case actionTypes.AUTH_FAIL:return authfail(state,action)
        case actionTypes.AUTH_LOGOUT:return authLogout(state,action)
        case actionTypes.NOT_VERIFIED:return notVerified(state,action)
        default:
            return state;
    }
}
export default reducer; 
