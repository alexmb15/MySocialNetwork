import {followAPI, userAPI} from "../api/api";
import {updateObjectInArray} from "../utils/object-helpers";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE_IS_FOLLOWING_PROGRESS";


let initialState = {
    users: [],
    totalUsersCount: 0,
    pageSize: 5,
    currentPage: 1,
    followInProgress: [],
    /*fake: 1*/
};



const usersReducer = (state = initialState, action) => {
    //debugger;
    switch (action.type) {
        /*case "FAKE": return { ...state, fake: state.fake + 1}*/
        case FOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: true})
                /*users: state.users.map(user => {
                    if (user.id === action.userId) {
                        return {...user, followed: true}
                    }
                    return user;
                })*/
            }
        case UNFOLLOW:
            return {
                ...state,
                users: updateObjectInArray(state.users, action.userId, "id", {followed: false})
                /*users: state.users.map(user => {
                    if (user.id === action.userId) {
                        return {...user, followed: false}
                    }
                    return user;
                })*/
            }
        case SET_USERS:
            return {
                ...state,
                users: [...action.users]
            }
        case SET_TOTAL_USERS_COUNT:
            return {
                ...state,
                totalUsersCount: action.totalUsersCount
            }
        case SET_CURRENT_PAGE:
            return {
                ...state,
                currentPage: action.currentPage
            }
        case TOGGLE_IS_FOLLOWING_PROGRESS:
            //debugger;
            return {
                ...state,
                followInProgress: action.isFetching
                    ? [...state.followInProgress, action.userId]
                    : state.followInProgress.filter(id => id != action.userId)
            }

        default:
            return state;
    }
}

//Action Creators
export const followUser = (userId) => ({type: FOLLOW, userId});
export const unfollowUser = (userId) => ({type: UNFOLLOW, userId});
export const setUsers = (users) => ({type: SET_USERS, users});
export const setTotalUsersCount = (totalUsersCount) => ({type: SET_TOTAL_USERS_COUNT, totalUsersCount});
export const setCurrentPage = (currentPage) => ({type: SET_CURRENT_PAGE, currentPage});
export const toggleFollowingProgress = (isFetching, userId) => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching,
    userId
})

//ThunkCreators
export const getUsers = (currentPage, pageSize) => {
    return async (dispatch) => {
        let data = await userAPI.getUsers(currentPage, pageSize);
        dispatch(setCurrentPage(currentPage));
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount));
    }
}

const followUnfollow = async (dispatch, userId, methodAPI, actionCreator) => {
    dispatch(toggleFollowingProgress(true, userId));
    let data = await methodAPI(userId);
    if (data.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(toggleFollowingProgress(false, userId));
    /*}).catch(error => {
        alert("onFollow: error: " + error);
    });*/
}

export const follow = (userId) => {
    return async (dispatch) => {
        /*let methodAPI = followAPI.follow.bind(followAPI);
        let actionCreator = followUser;*/
        followUnfollow(dispatch, userId, followAPI.follow.bind(followAPI), followUser);
    }
}

export const unfollow = (userId) => {
    return async (dispatch) => {
        /*let methodAPI = followAPI.unfollow.bind(followAPI);
        let actionCreator = unfollowUser;*/
        followUnfollow(dispatch, userId, followAPI.unfollow.bind(followAPI), unfollowUser);
    }
}

export default usersReducer;