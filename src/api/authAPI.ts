import {instance, APIResponseType, ResultCodeForCaptchaEnum, ResultCodesEnum} from "./api";

type IsAuthResponseDataType = {
    id: number
    email: string
    login: string
}
type LoginResponseDataType = {
    userId: number
}
export const authAPI = {
    isAuth() {
        return instance.get<APIResponseType<IsAuthResponseDataType>>(`auth/me`).then(response => {
            return response.data
        });
    },

    logIn(email: string, password: string, rememberMe = false, captcha: string) {
        return instance.post<APIResponseType<LoginResponseDataType, ResultCodesEnum | ResultCodeForCaptchaEnum>>(`auth/login`, {
            email,
            password,
            rememberMe,
            captcha
        }).then(response => {
            return response.data
        });
    },

    logOut() {
        return instance.delete<APIResponseType>(`auth/login`).then(response => {
            return response.data
        });
    }
}