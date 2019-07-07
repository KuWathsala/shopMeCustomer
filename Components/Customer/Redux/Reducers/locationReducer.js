import {
    LOCATION_REQUEST,
    LOCATION_FAILURE,
    LOCATION_SUCCESS
} from '../Actions/types';

const initialState={
    loading:false, 
    latitude: 0,
    longitude: 0,
    errorMessage: '',
};

export const locationReducer=(state=initialState, action)=>{
    switch(action.type){
        case LOCATION_REQUEST:
            return {...state, loading: true};
        case LOCATION_FAILURE:
            return {...state, loading: false, errorMessage: action.payload};
        case LOCATION_SUCCESS:
            return { ...state, loading: false, searchProducts: action.payload};
        default:
            return state;
    }
}


