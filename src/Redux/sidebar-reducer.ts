import {InferActionsTypes} from "./redux-store";

let initialState =  {
    friends: [
        {id: 1, userId: 2, name: "samurai dimych"},
        {id: 2, userId: 9, name: "Jak Zigil`man"},
        {id: 3, userId: 11, name: "Sol"}
    ] as Array<FriendType>
};

const sidebarReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case "ADD_NEW_FRIEND":
            let newFriend = {
                id: state.friends[state.friends.length-1].id + 1,
                userId: action.userId,
                name: action.fullName
            }
            return {
                ...state,
                friends: [...state.friends, newFriend]
            }
        case "SET_USERS":
            return {
                ...state,
                friends: action.users
            }
    }
    return state;
}

//ActionCreators
export const sidebarActions = {
    addNewFriend: (userId: number, fullName: string) => (
        { type: "ADD_NEW_FRIEND", userId, fullName } as const
    ),
    setFriends: (users: Array<FriendType>) => (
        { type: "SET_USERS", users} as const
    )
}


export default sidebarReducer;

type FriendType = {
    id: number,
    userId: number,
    name: string
}
type InitialStateType = typeof initialState
type ActionTypes = InferActionsTypes<typeof sidebarActions>