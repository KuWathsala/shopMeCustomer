import {
    CART_REQUEST,
    CART_FAILURE,
    CART_SUCCESS,
    CART_ITEM_ADD_SUCCESS,
    CART_ITEM_REMOVE_SUCCESS
} from '../Actions/types'; 

const initialState={
    loading: false, 
    errorMessage: '',
    arr : []
};

export const cartReducer=(state=initialState, action)=>{
    console.log(state)
    switch(action.type){
        case CART_REQUEST:
            return {...state, loading: true};
        case CART_SUCCESS:
                return {...state, loading: false};
        case CART_FAILURE:
            return {...state, loading: false, errorMessage: action.payload};
        case CART_ITEM_ADD_SUCCESS:
            return {...state, arr: [...state.arr, action.payload]};
        case CART_ITEM_REMOVE_SUCCESS:
            return {...state, ...state.arr.splice(action.payload, 1)}
        default:
            return state;
    }
}


