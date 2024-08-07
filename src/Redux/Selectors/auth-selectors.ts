import {AppStateType} from "../redux-store";

export const getUserIdSelector = (state: AppStateType) => {
    return state.auth.userId;
}
export const getLogin = (state: AppStateType) => {
    return state.auth.login;
}
export const getIsAuth = (state: AppStateType) => {
    return state.auth.isAuth;
}
export const getCaptchaURL = (state: AppStateType) => {
    return state.auth.captchaURL;
}