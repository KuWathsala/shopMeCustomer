import thunk from 'redux-thunk';
import popularProductsListReducer from '../Reducers/popularProductsListReducer';
import discountedProductsListReducer from '../Reducers/discountedProductsListReducer';
import { applyMiddleware, createStore, combineReducers} from 'redux';
import moreProductsListReducer from '../Reducers/moreProductsListReducer';
import {searchProductsListReducer} from '../Reducers/searchProductsListReducer';
import { locationReducer } from '../Reducers/locationReducer';

const rootReducer= combineReducers({
    popularProductsList: popularProductsListReducer,
    discountedProductsList: discountedProductsListReducer,
    moreProductsList: moreProductsListReducer,
    searchProductsList: searchProductsListReducer,
    location: locationReducer,
});

export default createStore(rootReducer, applyMiddleware(thunk))