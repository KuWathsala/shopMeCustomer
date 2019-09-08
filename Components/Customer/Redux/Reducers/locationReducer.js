import {
    LOCATION_REQUEST,
    LOCATION_FAILURE,
    LOCATION_SUCCESS
} from '../Actions/types';

const initialState={
    loading:false, 
    source: {
        latitude: 6.9271,
        longitude: 79.8612,
        address: ''
    },
    errorMessage: '',
};


export const locationReducer=(state=initialState, action)=>{
    //console.log(action)
    switch(action.type){
        case LOCATION_REQUEST:
            return {...state, loading: true};
        case LOCATION_FAILURE:
            return {...state, loading: false, errorMessage: action.payload};
        case LOCATION_SUCCESS:
            return { ...state, loading: false, source: action.payload};
        default:
            return state;
    }
}


