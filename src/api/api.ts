import axios from "axios";

/*const config = {
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        "API-KEY": "690d6030-405b-47b2-9288-4542d8f1d46d"
    }}*/
axios.defaults.baseURL = 'https://social-network.samuraijs.com/api/1.0/';
axios.defaults.headers.common["API-KEY"] = "690d6030-405b-47b2-9288-4542d8f1d46d";
axios.defaults.withCredentials = true;

export let instance = axios.create();

export enum ResultCodesEnum {
    Success = 0,
    Error = 1
}

export enum ResultCodeForCaptchaEnum {
    CaptchaIsRequired = 10
}

export type APIResponseType<D = {}, RC = ResultCodesEnum> = {
    data: D
    resultCode: RC
    messages: Array<string>
}

