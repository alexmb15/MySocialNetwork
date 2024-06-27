import {followAPI, userAPI} from "../api/api";
import {updateObjectInArray} from "../utils/object-helpers";
import {UserType} from "../types/types";
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionsTypes} from "./redux-store";
import {Dispatch} from "redux";

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
        case "FOLLOW":
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
        case "UNFOLLOW":
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
        case "SET_USERS":
            return {
                ...state,
                users: [...action.users]
            }
        case "SET_TOTAL_USERS_COUNT":
            return {
                ...state,
                totalUsersCount: action.totalUsersCount
            }
        case "SET_CURRENT_PAGE":
            return {
                ...state,
                currentPage: action.currentPage
            }
        case "TOGGLE_IS_FOLLOWING_PROGRESS":
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
type ActionTypes = InferActionsTypes<typeof actions>

export const actions = {
    followUser: (userId: number) => ({type: 'FOLLOW', userId} as const),
    unfollowUser: (userId: number) => ({type: 'UNFOLLOW', userId} as const),
    setUsers: (users: Array<UserType>) => ({type: 'SET_USERS', users} as const),
    setTotalUsersCount: (totalUsersCount: number) =>
        ({type: 'SET_TOTAL_USERS_COUNT', totalUsersCount} as const),
    setCurrentPage: (currentPage: number) => ({type: 'SET_CURRENT_PAGE', currentPage} as const),
    toggleFollowingProgress: (isFetching: boolean, userId: number) => ({
        type: 'TOGGLE_IS_FOLLOWING_PROGRESS',
        isFetching,
        userId
    } as const)
}

//ThunkCreators
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>

export const getUsers = (currentPage: number, pageSize: number): ThunkType => {
    return async (dispatch, getState) => {
        let data = await userAPI.getUsers(currentPage, pageSize);
        //console.log(data)
        dispatch(actions.setCurrentPage(currentPage));
        dispatch(actions.setUsers(data.items));
        dispatch(actions.setTotalUsersCount(data.totalCount));
        //debugger
    }
}

const followUnfollow = async (dispatch: Dispatch<ActionTypes>, userId: number, methodAPI: any,
                              actionCreator: (userId: number) => ActionTypes) => {
    dispatch(actions.toggleFollowingProgress(true, userId));
    let data = await methodAPI(userId);
    if (data.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(actions.toggleFollowingProgress(false, userId));
    /*}).catch(error => {
        alert("onFollow: error: " + error);
    });*/
}

export const follow = (userId: number): ThunkType => {
    return async (dispatch, getState) => {
        /*let methodAPI = followAPI.follow.bind(followAPI);
        let actionCreator = followUser;*/
        followUnfollow(dispatch, userId, followAPI.follow.bind(followAPI), actions.followUser);
    }
}

export const unfollow = (userId: number): ThunkType => {
    return async (dispatch, getState) => {
        /*let methodAPI = followAPI.unfollow.bind(followAPI);
        let actionCreator = unfollowUser;*/
        followUnfollow(dispatch, userId, followAPI.unfollow.bind(followAPI), actions.unfollowUser);
    }
}

export default usersReducer;