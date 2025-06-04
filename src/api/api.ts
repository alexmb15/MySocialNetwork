import axios from "axios";

axios.defaults.baseURL = process.env.REACT_APP_BASEURL;
axios.defaults.headers.common["API-KEY"] = process.env.REACT_APP_API_KEY;
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

