import {
    CART_REQUEST,
    CART_FAILURE,
    CART_SUCCESS
} from '../Actions/types'; 

const initialState={
    loading: false, 
    errorMessage: '',
    arr : []
};

export const cartReducer=(state=initialState, action)=>{
    switch(action.type){
        case CART_REQUEST:
            return {...state, loading: true};
        case CART_FAILURE:
            return {...state, loading: false, errorMessage: action.payload};
        case CART_SUCCESS:
            return {...state, arr: [...state.arr, action.payload]};
        default:
            return state;
    }
}


