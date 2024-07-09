import {updateObjectInArray} from "../utils/object-helpers";
import {UserType} from "../types/types";
import {ThunkAction} from "redux-thunk";
import {AppStateType, InferActionsTypes} from "./redux-store";
import {Dispatch} from "redux";
import {userAPI} from "../api/userAPI";
import {followAPI} from "../api/followAPI";
import {sidebarActions} from "./sidebar-reducer";

let initialState = {
    users: [] as Array<UserType>,
    totalUsersCount: 0,
    pageSize: 10,
    currentPage: 1,
    followInProgress: [] as Array<number>, //array of userId's
    isFetching: true,
    filter: {
        term: "",
        friend: null as null | boolean
    }
};

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
                users: action.users
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
        case "TOGGLE_IS_FETCHING":
            return {
                ...state,
                isFetching: action.isFetching
            }
        case "SET_FILTER":
            return {
                ...state,
                filter: action.payload
            }

        default:
            return state;
    }
}

//Action Creators
export const usersActions = {
    followUser: (userId: number) => ({type: 'FOLLOW', userId} as const),
    unfollowUser: (userId: number) => ({type: 'UNFOLLOW', userId} as const),
    setUsers: (users: Array<UserType>) => ({type: 'SET_USERS', users} as const),
    setTotalUsersCount: (totalUsersCount: number) =>
        ({type: 'SET_TOTAL_USERS_COUNT', totalUsersCount} as const),
    setCurrentPage: (currentPage: number) => ({type: 'SET_CURRENT_PAGE', currentPage} as const),
    setFilter: (filter: FilterType) => ({type: 'SET_FILTER', payload: filter} as const),
    toggleFollowingProgress: (isFetching: boolean, userId: number) => ({
        type: 'TOGGLE_IS_FOLLOWING_PROGRESS',
        isFetching,
        userId
    } as const),
    toggleIsFetching: (isFetching: boolean) => ({type: 'TOGGLE_IS_FETCHING', isFetching} as const)
}

//ThunkCreators
export const getUsers = (currentPage: number, pageSize: number, filter: FilterType): ThunkType => {
    return async (dispatch) => {
        dispatch(usersActions.toggleIsFetching(true))
        let data = await userAPI.getUsers(currentPage, pageSize, filter.term, filter.friend);
        //console.log(data)
        dispatch(usersActions.setCurrentPage(currentPage));
        dispatch(usersActions.setFilter(filter));
        dispatch(usersActions.setUsers(data.items));
        dispatch(usersActions.setTotalUsersCount(data.totalCount));
        dispatch(usersActions.toggleIsFetching(false))
    }
}

const followUnfollow = async (dispatch: Dispatch<ActionTypes>, userId: number, methodAPI: any,
                              actionCreator: (userId: number) => ActionTypes) => {
    dispatch(usersActions.toggleFollowingProgress(true, userId));
    let data = await methodAPI(userId);
    if (data.resultCode === 0) {
        dispatch(actionCreator(userId));
    }
    dispatch(usersActions.toggleFollowingProgress(false, userId));
    /*}).catch(error => {
        alert("onFollow: error: " + error);
    });*/
}

export const followUser = (userId: number): ThunkType => {
    return async (dispatch) => {
        /*let methodAPI = followAPI.follow.bind(followAPI);
        let actionCreator = followUser;*/
        await followUnfollow(dispatch, userId, followAPI.follow.bind(followAPI), usersActions.followUser);
    }
}

export const unfollowUser = (userId: number): ThunkType => {
    return async (dispatch) => {
        /*let methodAPI = followAPI.unfollow.bind(followAPI);
        let actionCreator = unfollowUser;*/
        await followUnfollow(dispatch, userId, followAPI.unfollow.bind(followAPI), usersActions.unfollowUser);
    }
}

export default usersReducer;

type InitialStateType = typeof initialState
export type FilterType = typeof initialState.filter
type ActionTypes = InferActionsTypes<typeof usersActions>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionTypes>
