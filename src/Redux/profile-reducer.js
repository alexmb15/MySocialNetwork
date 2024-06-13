import {profileAPI} from "../api/api";
import {stopSubmit} from "redux-form";

const ADD_POST = "ADD_POST";
const SET_USER_PROFILE = "SET_USER_PROFILE";
const SET_USER_STATUS = "SET_USER_STATUS"
const SET_USER_PHOTO = "SET_USER_PHOTO"
const SET_EDIT_PROFILE_MODE = "SET_EDIT_PROFILE_MODE"

let initialState = {
    userProfile: null,
    isEditProfileMode: false,
    posts: [
        {id: 1, message: "Hi! How are you?", name: "Alex K", likesCount: 20}
    ],
    lastPostNumber: 1,
    status: ""

};

const profileReducer = (state = initialState, action) => {
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
                userProfile: {...state.userProfile, photos: action.photos}
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
export const addPostActionCreator = (newPostText) => ({type: ADD_POST, newPostText});
export const setUserProfile = (userProfile) => ({type: SET_USER_PROFILE, userProfile});
export const setUserStatus = (status) => ({type: SET_USER_STATUS, status});
export const setUserPhoto = (photos) => ({type: SET_USER_PHOTO, photos})
export const setEditProfileMode = (editProfileMode) => ({type: SET_EDIT_PROFILE_MODE, editProfileMode})

//ThunkCreators
export const getUserProfile = (userId) => {
    return async (dispatch) => {
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
export const getUserStatus = (userId) => {
    return async (dispatch) => {
        try {
            const data = await profileAPI.getUserStatus(userId);
            dispatch(setUserStatus(data));
        } catch (e) {
            alert(e);
        }
    }
}

export const updateUserStatus = (status) => {
    return async (dispatch) => {
        try {
            const data = await profileAPI.updateUserStatus(status);
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

export const updateUserProfilePhoto = (file) => {
    return async (dispatch) => {
        try {
            let data = await profileAPI.updateUserProfilePhoto(file);
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

export const saveProfileInfo = (profileData) => {
    return async (dispatch, getState) => {
        try {
            let data = await profileAPI.saveProfileInfo(profileData);
            if (data.resultCode === 0) {
                debugger;
                console.log(data);
                dispatch(getUserProfile(getState().auth.userId));
                dispatch(setEditProfileMode(false));
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