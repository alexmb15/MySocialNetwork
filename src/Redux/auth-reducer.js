import {authAPI, securityAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const SET_AUTH_USER_DATA = "SET_AUTH_USER_DATA";
const SET_CAPTCHA = "SET_CAPTCHA";

let initialState = {
    userId: null,
    login: null,
    email: null,
    isAuth: false,
    captchaURL: null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CAPTCHA:
        case SET_AUTH_USER_DATA:
            debugger;
            return {
                ...state,
                ...action.data
                //isAuth: true
            }

        default:
            return state;
    }
}

//ActionCreators
export const setAuthUserData = (userId, login, email, isAuth) => (
    {
        type: SET_AUTH_USER_DATA, data: {userId, login, email, isAuth}
    });

export const setCaptcha = (captchaURL) => ({type: SET_CAPTCHA, data: {captchaURL}});

//ThunkCreators
export const getAuthUserData = () => {
    return async (dispatch) => {
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


export const logIn = (email, password, rememberMe, captcha) => {
    return async (dispatch) => {
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
    return async (dispatch) => {
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
    return async (dispatch) => {
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