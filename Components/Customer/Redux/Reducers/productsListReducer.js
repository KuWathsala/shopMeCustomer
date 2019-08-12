import {
    POPULAR_PRODUCT_LIST_REQUEST,
    POPULAR_PRODUCT_LIST_SUCCESS,
    POPULAR_PRODUCT_LIST_FAILURE
} from '../Actions/types';

const initialState={
    loading:false,
    products: null,
    errorMessage: '',
};

export const productsListReducer=(state=initialState, action)=>{
    switch(action.type){
        case POPULAR_PRODUCT_LIST_REQUEST:
            return {...state, loading: true};
        case POPULAR_PRODUCT_LIST_FAILURE:
            return {...state, loading: false, errorMessage: action.payload};
        case POPULAR_PRODUCT_LIST_SUCCESS:
            return { ...state, loading: false, products: action.payload};
        default:
            return state;
    }
}
