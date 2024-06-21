import axios, {AxiosResponse, CreateAxiosDefaults} from "axios";
import {PhotosType, ProfileType, UserType} from "../types/types";

/*const config = {
    baseURL: 'https://social-network.samuraijs.com/api/1.0/',
    withCredentials: true,
    headers: {
        "API-KEY": "690d6030-405b-47b2-9288-4542d8f1d46d"
    }}*/
axios.defaults.baseURL = 'https://social-network.samuraijs.com/api/1.0/';
axios.defaults.headers.common["API-KEY"] = "690d6030-405b-47b2-9288-4542d8f1d46d";
axios.defaults.withCredentials = true;

let instance = axios.create();

type GetUsersType = {
    items: Array<UserType>
    totalCount: number
    error: string | null
}
export const userAPI = {
    getUsers(currentPage = 1, pageSize = 5) {
        return instance.get<any, AxiosResponse<GetUsersType>>(`users?page=${currentPage}&count=${pageSize}`)
            .then(response => {
                //debugger;
                return response.data;
            });
    }
}

export enum ResultCodes {
    Success = 0,
    Error = 1
}
export enum ResultCodeForCaptcha {
    CaptchaIsRequired = 10
}
type IsAuthResponseType = {
    data: {
        id: number
        email: string
        login: string
    }
    resultCode: ResultCodes
    messages: Array<string>
}
type LoginResponseType = {
    data: {
        userId: number
    }
    resultCode: ResultCodes | ResultCodeForCaptcha
    messages: Array<string>
}
type EmptyDataResponseType = {
    data: {}
    resultCode: ResultCodes
    messages: Array<string>
}
export  const authAPI = {
    isAuth() {
        return instance.get<any, AxiosResponse<IsAuthResponseType>>(`auth/me`).then(response => {return response.data});
    },

    logIn(email: string, password: string, rememberMe = false, captcha: string) {
        return instance.post<any, AxiosResponse<LoginResponseType>>(`auth/login`, {email, password, rememberMe, captcha});
    },

    logOut() {
        return instance.delete<any, AxiosResponse<EmptyDataResponseType>>(`auth/login`).then(response => { return response.data});
    }
}

type GetCaptchaResponseType = {
    url: string
}
export const securityAPI = {
    getCaptcha() {
        return instance.get<any, AxiosResponse<GetCaptchaResponseType>>(`security/get-captcha-url`).then(response => { return response.data});
    }
}

type UpdateUserProfilePhoto = {
    data: {
        photos: PhotosType
    }
    resultCode: ResultCodes
    messages: Array<string>
}
export const profileAPI = {
    getProfile(userId: number) {
        return instance.get<any, AxiosResponse<ProfileType>>(`profile/${userId}`).then(response => { return response.data});
    },

    getUserStatus(userId: number) {
        return instance.get<any, AxiosResponse<string>>(`profile/status/${userId}`).then(response => { return response.data});
    },

    updateUserStatus(status: string) {
        return instance.put<any, AxiosResponse<EmptyDataResponseType>>(`profile/status`, {status: status}).then(response => { return response.data});
    },

    updateUserProfilePhoto(file: File) {
        const formData = new FormData();
        formData.append("image", file);

        return instance.put<any, AxiosResponse<UpdateUserProfilePhoto>>(`profile/photo`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(response => { return response.data});
    },

    saveProfileInfo(profileData: ProfileType) {
        return instance.put<any, AxiosResponse<EmptyDataResponseType>>(`profile`, profileData).then(response => { return response.data});
    }
}

export const followAPI = {
    follow(userId: number) {
        return instance.post<any, AxiosResponse<EmptyDataResponseType>>(`follow/${userId}`)
            .then(response => {
                return response.data;
            });
    },

    unfollow(userId: number) {
        return instance.delete<any, AxiosResponse<EmptyDataResponseType>>(`follow/${userId}`)
            .then(response => {
                return response.data;
            })
    }
}

