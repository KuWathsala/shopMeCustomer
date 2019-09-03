import thunk from 'redux-thunk';
import {productsListReducer} from '../Reducers/productsListReducer';
import { applyMiddleware, createStore,compose, combineReducers} from 'redux';
import { locationReducer } from '../Reducers/locationReducer';
import {cartReducer} from '../Reducers/cartReducer';
import { shopsListReducer } from '../Reducers/shopsListReducer';
import { searchProductsListReducer } from '../Reducers/searchProductsListReducer';
import { composeWithDevTools } from 'remote-redux-devtools';
import authReducer from '../Reducers/Auth';
import {reducer as formReducer} from 'redux-form';
import {createLogger} from 'redux-logger';

const rootReducer= combineReducers({
    productsList: productsListReducer,
    searchProductsList: searchProductsListReducer,
    location: locationReducer,
    cart: cartReducer,
    shopsList: shopsListReducer,
    auth:authReducer,
    form:formReducer
});

//export default createStore(rootReducer, applyMiddleware(thunk));
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const logger=createLogger({diff:true,collapsed:true});

export default createStore(rootReducer,composeEnhancers(applyMiddleware(logger,thunk)));