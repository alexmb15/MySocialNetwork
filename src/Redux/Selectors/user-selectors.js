import {createSelector} from "reselect";

//get functions
const getUsers = (state) => {
    console.log("getUsers")
    return state.usersPage.users;
}
export const getTotalUsersCount = (state) => {
    return state.usersPage.totalUsersCount;
}
export const getPageSize = (state) => {
    return state.usersPage.pageSize;
}
export const getCurrentPage = (state) => {
    return state.usersPage.currentPage;
}
export const getStatusFollowInProgress = (state) => {
    return state.usersPage.followInProgress;
}

//selectors
export const getUsersSelector = createSelector(getUsers, (users) => {
    console.log("getUsersSelector")
    return users.filter( user => true);
})