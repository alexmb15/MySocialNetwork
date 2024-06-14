import {authAPI, securityAPI} from "../api/api"
import {stopSubmit} from "redux-form"

const SET_AUTH_USER_DATA = "SET_AUTH_USER_DATA"
const SET_CAPTCHA = "SET_CAPTCHA"

let initialState = {
    userId: null as number | null,
    login: null as string | null,
    email: null as string | null,
    isAuth: false,
    captchaURL: null as string | null
};

type InitialStateType = typeof initialState

const authReducer = (state = initialState, action: any): InitialStateType => {
    switch (action.type) {
        case SET_CAPTCHA:
        case SET_AUTH_USER_DATA:
            debugger;
            return {
                ...state,
                ...action.payload
            }

        default:
            return state;
    }
}

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
    isAuth: boolean): SetAuthUserDataType => (
    {
        type: SET_AUTH_USER_DATA,
        payload: {userId, login, email, isAuth}
    });

type SetCaptchaType = {
    type: typeof SET_CAPTCHA
    payload: {captchaURL: string}
}

export const setCaptcha = (captchaURL: string): SetCaptchaType => ({type: SET_CAPTCHA, payload: {captchaURL}});

//ThunkCreators
export const getAuthUserData = () => {
    return async (dispatch: any) => {
        try {
            const data = await authAPI.isAuth();
            //debugger;
            if (data.resultCode === 0) {
                let {id, login, email} = data.data;
                dispatch(setAuthUserData(id, login, email, true));
            } else {
                dispatch(setAuthUserData(null, null, null, false));
            }
        }catch (error) {
            alert(error);
        }
    }
}


export const logIn = (email: string, password: string, rememberMe: boolean, captcha: string) => {
    return async (dispatch: any) => {
        try {
            const response = await authAPI.logIn(email, password, rememberMe, captcha);
            if (response.data.resultCode === 0) {
                dispatch(getAuthUserData());
            } else {
                if (response.data.resultCode === 10) {
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

export const logOut = () => {
    return async (dispatch: any) => {
        debugger;
        try {
            const data = await authAPI.logOut();
            if (data.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null, false));
            }
        } catch (error) {
            alert(error);
        }
    }
}

export const getCaptcha = () => {
    return async (dispatch: any) => {
        try {
            const data = await securityAPI.getCaptcha();
            if (data.url)
                dispatch(setCaptcha(data.url));
        } catch (error) {
            alert(error);
        }
    }
}


export default authReducer;