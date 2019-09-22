import {
    CART_REQUEST,
    CART_FAILURE,
    CART_SUCCESS,
    CART_ITEM_ADD_SUCCESS,
    CART_ITEM_REMOVE_SUCCESS,
    CART_DELETE_SUCCESS
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

export const deleteSuccess=()=>({
    type: CART_DELETE_SUCCESS,
    //payload: error
}); 

export const removeItemSuccess=(index)=>({
    type: CART_ITEM_REMOVE_SUCCESS,
    payload: index
}); 

export const addItemSuccess=(json)=>({
    type: CART_ITEM_ADD_SUCCESS,
    payload: json
}); 

export const addCartItems=(item)=>{
    return dispatch=>{
        dispatch(addItemSuccess(item));
    }
}

export const removeCartItems=(index)=>{
    return dispatch=>{
        dispatch(removeItemSuccess(index));
    }
}

export const fetchCart=()=>{
    return dispatch=>{
        dispatch(cartSuccess());
    }
}

export const deleteCart=()=>{
    return dispatch=>{
        dispatch(deleteSuccess());
    }
}





