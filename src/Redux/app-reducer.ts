import {getAuthUserData} from "./auth-reducer";
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionsTypes} from "./redux-store";

let initialState = {
    initialized: false
}

type InitialStateType = typeof initialState

const appReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case "SET_INITIALIZED":
            return {
                ...state,
                initialized: true
            }

        default:
            return state;
    }
}

//ActionCreators
type ActionTypes = InferActionsTypes<typeof actions>

export const actions = {
    initializeSucceed: () => ({ type: "SET_INITIALIZED" } as const)
}

//ThunkCreators
//type
export const initializeApp = (): ThunkAction<void, AppStateType, unknown, ActionTypes> => {
    return (dispatch, getState) => {
        let dispatchResponse = dispatch(getAuthUserData());
        Promise.all([dispatchResponse]).then( () => {
            dispatch(actions.initializeSucceed());
        });
    }
}

export default appReducer;