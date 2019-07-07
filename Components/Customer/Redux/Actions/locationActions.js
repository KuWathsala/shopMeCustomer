import {
    LOCATION_REQUEST,
    LOCATION_SUCCESS,
    LOCATION_FAILURE
} from './types'; 
import axios from 'axios';

export const locationRequest=()=>({
    type: LOCATION_REQUEST
});

export const locationSuccess=(json)=>({
    type: LOCATION_SUCCESS,
    payload: json
}); 

export const locationFailure=(error)=>({
    type: LOCATION_FAILURE,
    payload: error
}); 

export const fetchCustomerLocation=()=>{
    return dispatch=>{
        dispatch(locationRequest());
        axios.get('https://192.168.43.15:5001/api/products')
        .then(json=>{
            dispatch(locationSuccess(json.data));
        })
        .catch (error=>{
			console.log(error);
            dispatch(locationFailure(error));
        })
    }
}

