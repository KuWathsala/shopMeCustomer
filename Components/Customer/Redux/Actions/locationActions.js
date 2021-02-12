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

export const fetchCustomerLocation=(latitude, longitude, address)=>{
    let source= {
        latitude: latitude,
        longitude: longitude,
        address: address
    }
    console.log("source-->>")
    console.log(source)
    return dispatch=>{
        dispatch(locationRequest());
        dispatch(locationSuccess(source));
    }
}

