import {
    POPULAR_PRODUCT_LIST_REQUEST,
    DISCOUNTED_PRODUCT_LIST_REQUEST,
    MORE_PRODUCT_LIST_REQUEST,
    POPULAR_PRODUCT_LIST_FAILURE,
    DISCOUNTED_PRODUCT_LIST_FAILURE,
    MORE_PRODUCT_LIST_FAILURE,
    POPULAR_PRODUCT_LIST_SUCCESS,
    DISCOUNTED_PRODUCT_LIST_SUCCESS,
    MORE_PRODUCT_LIST_SUCCESS,
} from './types'; 
import axios from 'axios';


export const popularProductListRequest=()=>({
    type: POPULAR_PRODUCT_LIST_REQUEST
});
export const discountedProductListRequest=()=>({
    type: DISCOUNTED_PRODUCT_LIST_REQUEST
});
export const moreProductListRequest=()=>({
    type: MORE_PRODUCT_LIST_REQUEST
});


export const popularProductListSuccess=(json)=>({
    type: POPULAR_PRODUCT_LIST_SUCCESS,
    payload: json
}); 
export const discountedProductListSuccess=(json)=>({
    type: DISCOUNTED_PRODUCT_LIST_SUCCESS,
    payload: json
}); 
export const moreProductListSuccess=(json)=>({
    type: MORE_PRODUCT_LIST_SUCCESS,
    payload: json
}); 


export const popularProductListFailure=(error)=>({
    type: POPULAR_PRODUCT_LIST_FAILURE,
    payload: error
}); 
export const discountedProductListFailure=(error)=>({
    type: DISCOUNTED_PRODUCT_LIST_FAILURE,
    payload: error
}); 
export const moreProductListFailure=(error)=>({
    type: MORE_PRODUCT_LIST_FAILURE,
    payload: error
}); 

export const fetchPopularProductList=()=>{
    return dispatch=>{
        dispatch(popularProductListRequest());
        axios.get('http://192.168.43.15:5001/api/products/GetPopularProducts')
        .then(json=>{
            dispatch(popularProductListSuccess(json.data));
        })
        .catch (error=>{
			console.log(error);
            dispatch(popularProductListFailure(error));
        })
    }
}

export const fetchDiscountedProductList=()=>{
    
    return dispatch => {
        dispatch(discountedProductListRequest());
        axios.get('http://192.168.43.15:5001/api/products/GetDiscountedProducts')
        .then(json=>{
            dispatch(discountedProductListSuccess(json.data));
        })
        .catch (error=>{
            dispatch(discountedProductListFailure(error));
        })
    }
}

export const fetchMoreProductList=()=>{
    
    return dispatch => {
        dispatch(moreProductListRequest());
        axios.get('http://192.168.43.15:5001/api/products/GetMoreProducts')
        .then(json=>{
            dispatch(moreProductListSuccess(json.data));
        })
        .catch (error=>{
			console.log(error);
            dispatch(moreProductListFailure(error));
        })
    }
}

export const fetchProductSearch=()=>{
    return dispatch=>{
        dispatch(productListRequest());
        axios.get('http://192.168.43.15:5001/api/products')
        .then(json=>{
            console.log(json.data);
            dispatch(searchProductListSuccess(json.data));
        })
        .catch (error=>{
			console.log(error);
            dispatch(productListFailure(error));
        })
    }
}

