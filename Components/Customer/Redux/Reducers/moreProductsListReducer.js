import {
    MORE_PRODUCT_LIST_REQUEST,
    MORE_PRODUCT_LIST_SUCCESS,
    MORE_PRODUCT_LIST_FAILURE
} from '../Actions/types';

const initialState={
    loading:false,
    moreProducts: null,
    errorMessage: '',
};

const moreProductsListReducer=(state=initialState, action)=>{
    switch(action.type){
        case MORE_PRODUCT_LIST_REQUEST:
            return {...state, loading: true};  
        case MORE_PRODUCT_LIST_FAILURE:
            return {...state, loading: false, errorMessage: action.payload};      
        case MORE_PRODUCT_LIST_SUCCESS:
            return { ...state, loading: false, moreProducts: action.payload};
        default:
            return state;
    }
}

export default moreProductsListReducer;