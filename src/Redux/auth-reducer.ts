import {authAPI, ResultCodeForCaptcha, ResultCodes, securityAPI} from "../api/api"
import {FormAction, stopSubmit} from "redux-form"
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";

const SET_AUTH_USER_DATA = "SET_AUTH_USER_DATA"
const SET_CAPTCHA = "SET_CAPTCHA"

let initialState = {
    userId: null as (number | null),
    login: null as string | null,
    email: null as string | null,
    isAuth: false,
    captchaURL: null as string | null
};

type InitialStateType = typeof initialState

const authReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case SET_CAPTCHA:
        case SET_AUTH_USER_DATA:
            //debugger;
            return {
                ...state,
                ...action.payload
            }

        default:
            return state;
    }
}

type ActionTypes = SetAuthUserDataType | SetCaptchaType | FormAction
//ActionCreators
type SetAuthUserDataPayloadType = {
    userId: number | null,
    login: string | null,
    email: string | null,
    isAuth: boolean
}
type SetAuthUserDataType = {
    type: typeof SET_AUTH_USER_DATA
    payload: SetAuthUserDataPayloadType
}

export const setAuthUserData = (
    userId: number | null,
    login: string | null,
    email: string | null,
    isAuth: boolean
): SetAuthUserDataType => (
    {
        type: SET_AUTH_USER_DATA,
        payload: {userId, login, email, isAuth}
    });

type SetCaptchaType = {
    type: typeof SET_CAPTCHA
    payload: { captchaURL: string }
}

export const setCaptcha = (captchaURL: string): SetCaptchaType => ({type: SET_CAPTCHA, payload: {captchaURL}});

//ThunkCreators
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>

export const getAuthUserData = ():ThunkType => {
    return async (dispatch, getState) => {
        try {
            const data = await authAPI.isAuth();
            //debugger;
            if (data.resultCode === ResultCodes.Success) {
                let {id, login, email} = data.data;
                dispatch(setAuthUserData(id, login, email, true));
            } else {
                dispatch(setAuthUserData(null, null, null, false));
            }
        } catch (error) {
            alert(error);
        }
    }
}


export const logIn = (email: string, password: string, rememberMe: boolean, captcha: string): ThunkType => {
    return async (dispatch,getState) => {
        try {
            const response = await authAPI.logIn(email, password, rememberMe, captcha);
            if (response.data.resultCode === ResultCodes.Success) {
                dispatch(getAuthUserData());
            } else {
                if (response.data.resultCode === ResultCodeForCaptcha.CaptchaIsRequired) {
                    dispatch(getCaptcha());
                }
                let errorMessage = response.data.messages.length > 0
                    ? response.data.messages[0]
                    : "Email or password is wrong!";
                dispatch(stopSubmit("login", {_error: errorMessage}));
            }
        } catch (error) {
            alert(error);
        }
    }
}

export const logOut = (): ThunkType => {
    return async (dispatch,getState) => {
        //debugger;
        try {
            const data = await authAPI.logOut();
            //console.log(data)
            if (data.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null, false));
            }
        } catch (error) {
            alert(error);
        }
    }
}

export const getCaptcha = (): ThunkType => {
    return async (dispatch, getState) => {
        try {
            const data = await securityAPI.getCaptcha();
            //console.log(data)
            if (data.url)
                dispatch(setCaptcha(data.url));
        } catch (error) {
            alert(error);
        }
    }
}


export default authReducer;