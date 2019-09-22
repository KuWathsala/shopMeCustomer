import {
    CART_REQUEST,
    CART_FAILURE,
    CART_SUCCESS,
    CART_ITEM_ADD_SUCCESS,
    CART_ITEM_REMOVE_SUCCESS,
    CART_DELETE_SUCCESS
} from '../Actions/types'; 

const initialState={
    loading: false, 
    errorMessage: '',
    arr : [],
    total: 0
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
            return {...state, arr: [...state.arr, action.payload], total: state.total + action.payload.unitPrice};
        case CART_ITEM_REMOVE_SUCCESS:
            return {...state,  total: state.total - state.arr[action.payload].unitPrice, ...state.arr.splice(action.payload,1) }
        case CART_DELETE_SUCCESS:
            return { ...state, arr: [], total: 0 }
        default:
            return state;           
    }
}


