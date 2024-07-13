import {AppStateType} from "../redux-store";

export const getPosts = (state: AppStateType) => {
    return state.profilePage.posts;
}
export const getUserProfileSelector = (state: AppStateType) => {
    return state.profilePage.userProfile;
}
export const getUserStatusSelector = (state: AppStateType) => {
    return state.profilePage.status;
}
export const getIsEditProfileModeSelector = (state: AppStateType) => {
    return state.profilePage.isEditProfileMode;
}