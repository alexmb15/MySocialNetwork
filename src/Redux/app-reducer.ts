import {getAuthUserData} from "./auth-reducer";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";

const SET_INITIALIZED = "SET_INITIALIZED";

export type InitialStateType = {
    initialized: boolean,
    globalError: null | string
}

let initialState: InitialStateType = {
    initialized: false,
    globalError: null
};

const appReducer = (state = initialState, action: ActionTypes): InitialStateType => {
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
type ActionTypes = InitializeSucceedType

type InitializeSucceedType = {
    type: typeof SET_INITIALIZED
}
export const initializeSucceed = (): InitializeSucceedType => ({ type: SET_INITIALIZED });

//ThunkCreators
//type
export const initializeApp = (): ThunkAction<void, AppStateType, unknown, ActionTypes> => {
    return (dispatch, getState) => {
        let dispatchResponse = dispatch(getAuthUserData());
        Promise.all([dispatchResponse]).then( () => {
            dispatch(initializeSucceed());
        });
    }
}

export default appReducer;