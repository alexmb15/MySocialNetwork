import {profileAPI} from "../api/api"
import {FormAction, stopSubmit} from "redux-form"
import {PhotosType, PostType, ProfileType} from "../types/types";
import {ThunkAction} from "redux-thunk";
import {AppStateType, BaseThunkType} from "./redux-store";

const ADD_POST = "ADD_POST"
const SET_USER_PROFILE = "SET_USER_PROFILE"
const SET_USER_STATUS = "SET_USER_STATUS"
const SET_USER_PHOTO = "SET_USER_PHOTO"
const SET_EDIT_PROFILE_MODE = "SET_EDIT_PROFILE_MODE"

let initialState = {
    userProfile: null as ProfileType | null,
    isEditProfileMode: false,
    posts: [
        {id: 1, message: "Hi! How are you?", name: "Alex K", likesCount: 20}
    ] as Array<PostType>,
    lastPostNumber: 1,
    status: ""
}

type InitialStateType = typeof initialState;

const profileReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    //debugger;
    switch (action.type) {
        case ADD_POST:
            let newPost = {
                id: state.lastPostNumber + 1,
                message: action.newPostText,
                name: "Alex K",
                likesCount: 0
            }
            return {
                ...state,
                posts: [...state.posts, newPost],
                lastPostNumber: newPost.id
            }
        case SET_USER_PROFILE:
            return {
                ...state,
                userProfile: action.userProfile
            }

        case SET_USER_PHOTO:
            //debugger;
            return {
                ...state,
                userProfile: {...state.userProfile, photos: action.photos} as ProfileType
            }

        case SET_USER_STATUS:
            return {
                ...state,
                status: action.status
            }
        case SET_EDIT_PROFILE_MODE:
            //debugger;
            return {
                ...state,
                isEditProfileMode: action.editProfileMode
            }

        default:
            return state;
    }
}

//ActionCreators
type ActionTypes = AddPostActionCreatorType | SetUserProfileType |
    SetUserStatusType | SetUserPhotoType | SetEditProfileModeType

type AddPostActionCreatorType ={
    type: typeof ADD_POST
    newPostText: string
}
export const addPost = (newPostText: string): AddPostActionCreatorType => ({type: ADD_POST, newPostText});

type SetUserProfileType = {
    type: typeof SET_USER_PROFILE
    userProfile: ProfileType
}
export const setUserProfile = (userProfile: ProfileType): SetUserProfileType => ({type: SET_USER_PROFILE, userProfile});

type SetUserStatusType = {
    type: typeof SET_USER_STATUS
    status: string
}
export const setUserStatus = (status: string): SetUserStatusType => ({type: SET_USER_STATUS, status});

type SetUserPhotoType = {
    type: typeof SET_USER_PHOTO
    photos: PhotosType
}
export const setUserPhoto = (photos: PhotosType): SetUserPhotoType => ({type: SET_USER_PHOTO, photos})

type SetEditProfileModeType = {
    type: typeof SET_EDIT_PROFILE_MODE
    editProfileMode: boolean
}
export const setEditProfileMode = (editProfileMode: boolean): SetEditProfileModeType =>
    ({type: SET_EDIT_PROFILE_MODE, editProfileMode})

//ThunkCreators
//type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>
type ThunkType = BaseThunkType<ActionTypes | FormAction>

export const getUserProfile = (userId: number): ThunkType => {
    return async (dispatch, getState) => {
        try {
            const data = await profileAPI.getProfile(userId);
            //debugger;
            dispatch(setUserProfile(data));
            //console.log(data);
        } catch (e) {
            alert(e);
        }
    }
}
export const getUserStatus = (userId: number): ThunkType => {
    return async (dispatch, getState) => {
        try {
            const data = await profileAPI.getUserStatus(userId);
            //console.log(data);
            dispatch(setUserStatus(data));
        } catch (e) {
            alert(e);
        }
    }
}

export const updateUserStatus = (status: string): ThunkType => {
    return async (dispatch, getState) => {
        try {
            const data = await profileAPI.updateUserStatus(status);
            //console.log(data);
            if (data.resultCode === 0) {
                dispatch(setUserStatus(status))
            } else if (data.resultCode === 1) {
                alert(data);
            }
        } catch (e) {
            alert(e);
        }
    }
}

export const updateUserProfilePhoto = (file: File): ThunkType => {
    return async (dispatch, getState) => {
        try {
            let data = await profileAPI.updateUserProfilePhoto(file);
            //console.log(data);
            if (data.resultCode === 0) {
                //debugger;
                dispatch(setUserPhoto(data.data.photos));
            } else if (data.resultCode === 1) {
                alert(data);
            }
        } catch (e) {
            alert(e);
        }
    }
}

export const saveProfileInfo = (profileData: ProfileType): ThunkType => {
    return async (dispatch, getState) => {
        try {
            const userId = getState().auth.userId
            let data = await profileAPI.saveProfileInfo(profileData);
            console.log(data);
            if (data.resultCode === 0) {
                if(userId!=null){
                    dispatch(getUserProfile(userId));
                    dispatch(setEditProfileMode(false));
                }else {
                    throw new Error("userId can't be null")
                }
            } else if (data.resultCode === 1) {
                debugger;
                let errorMessage = data.messages[0];
                let UploadError = errorMessage.slice(errorMessage.indexOf(">") + 1,
                    errorMessage.indexOf(")")).toLocaleLowerCase();
                //dispatch(stopSubmit("edit-profile", {_error: errorMessage}));
                dispatch(stopSubmit("edit-profile", {
                    contacts: {
                        [UploadError]: errorMessage
                    }
                }));
                dispatch(setEditProfileMode(true));
                //return Promise.reject(new Error(errorMessage));
            }
        } catch (e) {
            alert(e)
        }
    }
}

export default profileReducer;