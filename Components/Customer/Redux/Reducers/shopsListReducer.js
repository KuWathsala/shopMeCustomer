import {
    SHOPS_LIST_REQUEST,
    SHOPS_LIST_SUCCESS,
    SHOPS_LIST_FAILURE,
} from '../Actions/types';

const initialState={
    loading:false,
    shops: null,
    errorMessage: '',
};

export const shopsListReducer=(state=initialState, action)=>{
    switch(action.type){
        case SHOPS_LIST_REQUEST:
            return {...state, loading: true};  
        case SHOPS_LIST_FAILURE:
            return {...state, loading: false, errorMessage: action.payload};      
        case SHOPS_LIST_SUCCESS:
            return { ...state, loading: false, shops: action.payload};
        default:
            return state;
    }
}
