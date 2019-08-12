import {
    SHOPS_LIST_REQUEST,
    SHOPS_LIST_SUCCESS,
    SHOPS_LIST_FAILURE
} from './types'; 
import axios from 'axios';


export const shopsListRequest=()=>({
    type: SHOPS_LIST_REQUEST
});

export const shopsListSuccess=(json)=>({
    type: SHOPS_LIST_SUCCESS,
    payload: json
}); 

export const shopsListFailure=(error)=>({
    type: SHOPS_LIST_FAILURE,
    payload: error
}); 

export const fetchShopsList=(latitude, longitude)=>{
    console.log(latitude, longitude)
    return dispatch=>{
        dispatch(shopsListRequest());
        console.log("shopsList")
        axios.get(`http://192.168.43.15:5001/api/Sellers/${latitude},${longitude}`)
        .then(json=>{
            dispatch(shopsListSuccess(json.data));
        })
        .catch (error=>{
			console.log(error);
            dispatch(shopsListFailure(error));
        })
    }
}

