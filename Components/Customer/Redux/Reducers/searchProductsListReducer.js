import {
    SEARCH_PRODUCT_LIST_REQUEST,
    SEARCH_PRODUCT_LIST_SUCCESS,
    SEARCH_PRODUCT_LIST_FAILURE,
    SEARCH_INPUT
} from '../Actions/types';

const initialState={
    loading:false, 
    searchProducts: null,
    searchText: null,
    errorMessage: '',
};

export const searchProductsListReducer=(state=initialState, action)=>{
    switch(action.type){
        case SEARCH_PRODUCT_LIST_REQUEST:
            return {...state, loading: true};
        case SEARCH_PRODUCT_LIST_FAILURE:
            return {...state, loading: false, errorMessage: action.payload};
        case SEARCH_PRODUCT_LIST_SUCCESS:
            return { ...state, loading: false, searchProducts: action.payload};
        default:
            return state;
    }
}




