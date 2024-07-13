import {createSelector} from "reselect";
import {AppStateType} from "../redux-store";
import {UserType} from "../../types/types";

//get functions
const getUsers = (state: AppStateType) => {
    //console.log("getUsers")
    return state.usersPage.users;
}
export const getTotalUsersCount = (state: AppStateType) => {
    return state.usersPage.totalUsersCount;
}
export const getPageSize = (state: AppStateType) => {
    return state.usersPage.pageSize;
}
export const getCurrentPage = (state: AppStateType) => {
    return state.usersPage.currentPage;
}
export const getStatusFollowInProgress = (state: AppStateType) => {
    return state.usersPage.followInProgress;
}
export const getUsersFilter = (state: AppStateType) => {
    return  state.usersPage.filter;
}
export const getIsFetching = (state: AppStateType) => {
    return  state.usersPage.isFetching;
}


//selectors
export const getUsersSelector = createSelector(getUsers,(users: Array<UserType>) => {
    //console.log("getUsersSelector")
    return users.filter( user => true);
})