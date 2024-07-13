import {AppStateType} from "../redux-store";

export const getFriendsSelector = (state: AppStateType) => {
    return state.sidebar.friends;
}