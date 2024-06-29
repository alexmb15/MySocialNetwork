import {ResultCodeForCaptchaEnum, ResultCodesEnum} from "../api/api"
import {FormAction, stopSubmit} from "redux-form"
import {ThunkAction} from "redux-thunk";
import {AppStateType, BaseThunkType, InferActionsTypes} from "./redux-store";
import {authAPI} from "../api/authAPI";
import {securityAPI} from "../api/securityAPI";
import {Action} from "redux";

let initialState = {
    userId: null as (number | null),
    login: null as string | null,
    email: null as string | null,
    isAuth: false,
    captchaURL: null as string | null
};

const authReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case "SET_AUTH_USER_DATA":
        case "SET_CAPTCHA":
            //debugger;
            return {
                ...state,
                ...action.payload
            }

        default:
            return state;
    }
}


//ActionCreators

export const actions = {
    setAuthUserData: (userId: number | null, login: string | null, email: string | null, isAuth: boolean) =>
        ({
            type: "SET_AUTH_USER_DATA",
            payload: {userId, login, email, isAuth}
        } as const),
    setCaptcha: (captchaURL: string) => ({type: "SET_CAPTCHA", payload: {captchaURL}} as const)
}

//ThunkCreators
export const getAuthUserData = (): ThunkType => {
    return async (dispatch) => {
        try {
            const data = await authAPI.isAuth();
            //debugger;
            if (data.resultCode === ResultCodesEnum.Success) {
                let {id, login, email} = data.data;
                dispatch(actions.setAuthUserData(id, login, email, true));
            } else {
                dispatch(actions.setAuthUserData(null, null, null, false));
            }
        } catch (error) {
            alert(error);
        }
    }
}


export const logIn = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => {
    return async (dispatch) => {
        try {
            const data = await authAPI.logIn(email, password, rememberMe, captcha);
            if (data.resultCode === ResultCodesEnum.Success) {
                dispatch(getAuthUserData());
            } else {
                if (data.resultCode === ResultCodeForCaptchaEnum.CaptchaIsRequired) {
                    dispatch(getCaptcha());
                }
                let errorMessage = data.messages.length > 0
                    ? data.messages[0]
                    : "Email or password is wrong!";
                dispatch(stopSubmit("login", {_error: errorMessage}));
            }
        } catch (error) {
            alert(error);
        }
    }
}

export const logOut = (): ThunkType => {
    return async (dispatch) => {
        try {
            const data = await authAPI.logOut();
            //console.log(data)
            debugger;
            if (data.resultCode === 0) {
                dispatch(actions.setAuthUserData(null, null, null, false));
            }
        } catch (error) {
            alert(error);
        }
    }
}

export const getCaptcha = (): ThunkType => {
    return async (dispatch) => {
        try {
            const data = await securityAPI.getCaptcha();
            //console.log(data)
            if (data.url)
                dispatch(actions.setCaptcha(data.url));
        } catch (error) {
            alert(error);
        }
    }
}


export default authReducer;

type InitialStateType = typeof initialState
type ActionTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionTypes | FormAction>