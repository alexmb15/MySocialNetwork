import {getAuthUserData} from "./auth-reducer";
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionsTypes} from "./redux-store";

let initialState = {
    initialized: false
}

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
export const appActions = {
    initializeSucceed: () => ({ type: "SET_INITIALIZED" } as const)
}

//ThunkCreators
//type
export const initializeApp = (): ThunkAction<void, AppStateType, unknown, ActionTypes> => {
    return (dispatch) => {
        let dispatchResponse = dispatch(getAuthUserData());
        Promise.all([dispatchResponse]).then( () => {
            dispatch(appActions.initializeSucceed());
        });
    }
}

export default appReducer;

type InitialStateType = typeof initialState
type ActionTypes = InferActionsTypes<typeof appActions>