import {
    CART_REQUEST,
    CART_FAILURE,
    CART_SUCCESS
} from './types'; 
import axios from 'axios';

export const cartRequest=()=>({
    type: CART_REQUEST
});

export const cartSuccess=(json)=>({
    type: CART_SUCCESS,
    payload: json
}); 

export const cartFailure=(error)=>({
    type: CART_FAILURE,
    payload: error
}); 

export const addCartItems=(item)=>{
    return dispatch=>{
        dispatch(cartSuccess(item));
    }
}




