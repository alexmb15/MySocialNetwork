import {getAuthUserData} from "./auth-reducer";

const SET_INITIALIZED = "SET_INITIALIZED";

export type InitialStateType = {
    initialized: boolean,
    globalError: null | string
}

let initialState: InitialStateType = {
    initialized: false,
    globalError: null
};

const appReducer = (state = initialState, action: any): InitialStateType => {
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
type InitializeSucceedType = {
    type: typeof SET_INITIALIZED
}
export const initializeSucceed = (): InitializeSucceedType => ({ type: SET_INITIALIZED });

//ThunkCreators
export const initializeApp = () => {
    return (dispatch: any) => {
        let dispatchResponse = dispatch(getAuthUserData());
        Promise.all([dispatchResponse]).then( () => {
            dispatch(initializeSucceed());
        });
    }
}

export default appReducer;