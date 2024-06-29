import {FormAction, stopSubmit} from "redux-form"
import {PhotosType, PostType, ProfileType} from "../types/types";
import {ThunkAction} from "redux-thunk";
import {AppStateType, BaseThunkType, InferActionsTypes} from "./redux-store";
import {profileAPI} from "../api/profileAPI";

let initialState = {
    userProfile: null as ProfileType | null,
    isEditProfileMode: false,
    posts: [
        {id: 1, message: "Hi! How are you?", name: "Alex K", likesCount: 20}
    ] as Array<PostType>,
    lastPostNumber: 1,
    status: ""
}

const profileReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    //debugger;
    switch (action.type) {
        case "ADD_POST":
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
        case "SET_USER_PROFILE":
            return {
                ...state,
                userProfile: action.userProfile
            }

        case "SET_USER_PHOTO":
            //debugger;
            return {
                ...state,
                userProfile: {...state.userProfile, photos: action.photos} as ProfileType
            }

        case "SET_USER_STATUS":
            return {
                ...state,
                status: action.status
            }
        case "SET_EDIT_PROFILE_MODE":
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
export const actions = {
    addPost: (newPostText: string) => ({type: "ADD_POST", newPostText}as const),
    setUserProfile: (userProfile: ProfileType) => ({type: "SET_USER_PROFILE", userProfile}as const),
    setUserStatus: (status: string) => ({type: "SET_USER_STATUS", status}as const),
    setUserPhoto: (photos: PhotosType) => ({type: "SET_USER_PHOTO", photos}as const),
    setEditProfileMode: (editProfileMode: boolean) =>
        ({type: "SET_EDIT_PROFILE_MODE", editProfileMode}as const)
}

//ThunkCreators
//type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>
export const getUserProfile = (userId: number): ThunkType => {
    return async (dispatch) => {
        try {
            const data = await profileAPI.getProfile(userId);
            //debugger;
            dispatch(actions.setUserProfile(data));
            //console.log(data);
        } catch (e) {
            alert(e);
        }
    }
}
export const getUserStatus = (userId: number): ThunkType => {
    return async (dispatch) => {
        try {
            const data = await profileAPI.getUserStatus(userId);
            //console.log(data);
            dispatch(actions.setUserStatus(data));
        } catch (e) {
            alert(e);
        }
    }
}

export const updateUserStatus = (status: string): ThunkType => {
    return async (dispatch) => {
        try {
            const data = await profileAPI.updateUserStatus(status);
            //console.log(data);
            if (data.resultCode === 0) {
                dispatch(actions.setUserStatus(status))
            } else if (data.resultCode === 1) {
                alert(data);
            }
        } catch (e) {
            alert(e);
        }
    }
}

export const updateUserProfilePhoto = (file: File): ThunkType => {
    return async (dispatch) => {
        try {
            let data = await profileAPI.updateUserProfilePhoto(file);
            //console.log(data);
            if (data.resultCode === 0) {
                //debugger;
                dispatch(actions.setUserPhoto(data.data.photos));
            } else if (data.resultCode === 1) {
                alert(data.messages[0]);
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
                    dispatch(actions.setEditProfileMode(false));
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
                dispatch(actions.setEditProfileMode(true));
                //return Promise.reject(new Error(errorMessage));
            }
        } catch (e) {
            alert(e)
        }
    }
}

export default profileReducer;

type ActionTypes = InferActionsTypes<typeof actions>
type ThunkType = BaseThunkType<ActionTypes | FormAction>
type InitialStateType = typeof initialState;