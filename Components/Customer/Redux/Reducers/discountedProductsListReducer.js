import {
    DISCOUNTED_PRODUCT_LIST_REQUEST,
    DISCOUNTED_PRODUCT_LIST_SUCCESS,
    DISCOUNTED_PRODUCT_LIST_FAILURE
} from '../Actions/types';

const initialState={
    loading:false,
    discountedProducts: null,
    errorMessage: '',
};

const discountedProductsListReducer=(state=initialState, action)=>{
    switch(action.type){
        case DISCOUNTED_PRODUCT_LIST_REQUEST:
            return {...state, loading: true};
        case DISCOUNTED_PRODUCT_LIST_FAILURE:
            return {...state, loading: false, errorMessage: action.payload};
        case DISCOUNTED_PRODUCT_LIST_SUCCESS:
            return { ...state, loading: false, discountedProducts: action.payload};
        default:
            return state;
    }
}

export default discountedProductsListReducer;