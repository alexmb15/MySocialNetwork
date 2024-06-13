import {getAuthUserData} from "./auth-reducer";

const SET_INITIALIZED = "SET_INITIALIZED";

let initialState = {
    initialized: false
};

const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_INITIALIZED:
            return {
                ...state,
                initialized: true
            }

        default:
            return state;
    }
}

//ActionCreators
export const initializeSucceed = () => ({ type: SET_INITIALIZED });

//ThunkCreators
export const initializeApp = () => {
    return (dispatch) => {
        let dispatchResponse = dispatch(getAuthUserData());
        Promise.all([dispatchResponse]).then( () => {
            dispatch(initializeSucceed());
        });
    }
}

export default appReducer;