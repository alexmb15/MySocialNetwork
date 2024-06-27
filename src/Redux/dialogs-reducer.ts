import {InferActionsTypes} from "./redux-store";

type DialogType = {
    id: number
    name: string
    imgUrl: string | null
}
type MessageType = {
    id: number
    message: string
}

let initialState = {
    dialogs:  [
        {
            id: 1,
            name: "Alex",
            imgUrl: null
        }
    ] as Array<DialogType>,
    messages: [
        {id: 1, message: "Hi"}
    ] as Array<MessageType>
}

type InitialStatType = typeof initialState

const dialogsReducer = (state = initialState, action: ActionTypes): InitialStatType => {
    switch (action.type) {
        case "ADD-DIALOG-MESSAGE":
            let newDialogMessage = {
                id: state.messages[state.messages.length - 1].id + 1,
                message: action.newDialogMessage
            }
            //console.log(newDialogMessage);
            return {
                ...state,
                messages: [...state.messages, newDialogMessage]
            }
        default:
            return state
    }
}

//ActionCreators
type ActionTypes = InferActionsTypes<typeof actions>

export const actions = {
    /*addDialogMessageActionCreator: (newDialogMessage: string) => (
        { type: "ADD-DIALOG-MESSAGE", newDialogMessage } as const)*/
    addDialogMessage: (newDialogMessage: string) => (
        { type: "ADD-DIALOG-MESSAGE", newDialogMessage } as const)
}


export default dialogsReducer