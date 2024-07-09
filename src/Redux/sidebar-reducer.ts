import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {userAPI} from "../api/userAPI";

let initialState =  {
    friends: [] as Array<FriendType>
};

const sidebarReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case "SIDEBAR/ADD_NEW_FRIEND":
            let newFriend = {
                id: action.userId,
                name: action.fullName
            }
            return {
                ...state,
                friends: [...state.friends, newFriend]
            }

        case "SIDEBAR/SET_FRIENDS":
            return {
                ...state,
                friends: action.friends
            }

        default:
            return state;
    }
}

//ActionCreators
export const sidebarActions = {
    addNewFriend: (userId: number, fullName: string) => (
        { type: "SIDEBAR/ADD_NEW_FRIEND", userId, fullName } as const
    ),
    setFriends: (friends: Array<FriendType>) => (
        { type: "SIDEBAR/SET_FRIENDS", friends} as const
    )
}

//ThunkCreators
export const getFriends = ():ThunkType => {
    return async (dispatch) => {
        let data = await userAPI.getUsers(1, 10, "", true);
        if(data.items.length > 5) {
            data.items = data.items.slice(0,5)
        }
        let friends: Array<FriendType> = data.items.map(({id, name}) => ({id, name}))
        dispatch(sidebarActions.setFriends(friends))
        //console.log(friends)
    }
}

export default sidebarReducer;

type FriendType = {
    id: number,
    name: string
}
type InitialStateType = typeof initialState
type ActionTypes = InferActionsTypes<typeof sidebarActions>
type ThunkType = BaseThunkType<ActionTypes>