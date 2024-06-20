import {followAPI, userAPI} from "../api/api";
import {updateObjectInArray} from "../utils/object-helpers";
import {UserType} from "../types/types";
import {ThunkAction} from "redux-thunk";
import {AppStateType} from "./redux-store";
import {Dispatch} from "redux";

const FOLLOW = "FOLLOW";
const UNFOLLOW = "UNFOLLOW";
const SET_USERS = "SET_USERS";
const SET_TOTAL_USERS_COUNT = "SET_TOTAL_USERS_COUNT";
const SET_CURRENT_PAGE = "SET_CURRENT_PAGE";
const TOGGLE_IS_FOLLOWING_PROGRESS = "TOGGLE_IS_FOLLOWING_PROGRESS";

let initialState = {
    users: [] as Array<UserType>,
    totalUsersCount: 0,
    pageSize: 5,
    currentPage: 1,
    followInProgress: [] as Array<number>, //array of userId's
    /*fake: 1*/
};

type InitialStateType = typeof initialState

const usersReducer = (state = initialState, action: ActionTypes): InitialStateType => {
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
type ActionTypes = FollowUserType | UnfollowUserType | SetUsersType | SetTotalUsersCountType |
    SetCurrentPageType | ToggleFollowingProgressType

type FollowUserType = {
    type: typeof FOLLOW
    userId : number
}
export const followUser = (userId: number): FollowUserType => ({type: FOLLOW, userId});

type UnfollowUserType = {
    type: typeof UNFOLLOW
    userId: number
}
export const unfollowUser = (userId: number): UnfollowUserType => ({type: UNFOLLOW, userId});

type SetUsersType = {
    type: typeof SET_USERS
    users: Array<UserType>
}
export const setUsers = (users: Array<UserType>):SetUsersType => ({type: SET_USERS, users});

type SetTotalUsersCountType = {
    type: typeof SET_TOTAL_USERS_COUNT
    totalUsersCount: number
}
export const setTotalUsersCount = (totalUsersCount: number): SetTotalUsersCountType =>
    ({type: SET_TOTAL_USERS_COUNT, totalUsersCount})

type SetCurrentPageType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}
export const setCurrentPage = (currentPage: number): SetCurrentPageType => ({type: SET_CURRENT_PAGE, currentPage});

type ToggleFollowingProgressType = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching: boolean
    userId: number
}
export const toggleFollowingProgress = (isFetching: boolean, userId: number): ToggleFollowingProgressType => ({
    type: TOGGLE_IS_FOLLOWING_PROGRESS,
    isFetching,
    userId
})

//ThunkCreators
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>

export const getUsers = (currentPage: number, pageSize: number): ThunkType => {
    return async (dispatch, getState) => {
        let data = await userAPI.getUsers(currentPage, pageSize);
        dispatch(setCurrentPage(currentPage));
        dispatch(setUsers(data.items));
        dispatch(setTotalUsersCount(data.totalCount));
        //debugger
    }
}

const followUnfollow = async (dispatch: Dispatch<ActionTypes>, userId: number, methodAPI: any,
                              actionCreator: (userId: number) => FollowUserType | UnfollowUserType) => {
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

export const follow = (userId: number): ThunkType => {
    return async (dispatch, getState) => {
        /*let methodAPI = followAPI.follow.bind(followAPI);
        let actionCreator = followUser;*/
        followUnfollow(dispatch, userId, followAPI.follow.bind(followAPI), followUser);
    }
}

export const unfollow = (userId: number): ThunkType => {
    return async (dispatch, getState) => {
        /*let methodAPI = followAPI.unfollow.bind(followAPI);
        let actionCreator = unfollowUser;*/
        followUnfollow(dispatch, userId, followAPI.unfollow.bind(followAPI), unfollowUser);
    }
}

export default usersReducer;