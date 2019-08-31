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

/*let composeEnhancers = composeWithDevTools({
    //realtime: true,
    name: 'ShopMeNative',
    hostname: '192.168.43.15',
    port: 8081, // the port your remotedev server is running at
  });*/

const rootReducer= combineReducers({
    productsList: productsListReducer,
    searchProductsList: searchProductsListReducer,
    location: locationReducer,
    cart: cartReducer,
    shopsList: shopsListReducer,
    auth:authReducer,
    form:formReducer
});

export default createStore(rootReducer, applyMiddleware(thunk));