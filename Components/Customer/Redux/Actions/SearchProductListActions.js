import {
    SEARCH_PRODUCT_LIST_REQUEST,
    SEARCH_PRODUCT_LIST_FAILURE,
    SEARCH_PRODUCT_LIST_SUCCESS,
    SEARCH_INPUT
} from './types'; 
import axios from 'axios';


export const productListRequest=()=>({
    type: SEARCH_PRODUCT_LIST_REQUEST
});

export const searchProductListSuccess=(json)=>({
    type: SEARCH_PRODUCT_LIST_SUCCESS,
    payload: json
}); 

export const productListFailure=(error)=>({
    type: SEARCH_PRODUCT_LIST_FAILURE,
    payload: error
}); 

export const fetchProductSearch=(searchText)=>{
    return dispatch=>{
        dispatch(productListRequest());
        axios.get('https://backend-webapi20191102020215.azurewebsites.net/api/products/GetProductsSearch/'+searchText) //http://192.168.43.15:5001/
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
