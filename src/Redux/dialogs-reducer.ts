import {InferActionsTypes} from "./redux-store";
import {DialogType, MessageType} from "../types/types";

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

const dialogsReducer = (state = initialState, action: ActionTypes): InitialDialogStateType => {
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
export const dialogsActions = {
    /*addDialogMessageActionCreator: (newDialogMessage: string) => (
        { type: "ADD-DIALOG-MESSAGE", newDialogMessage } as const)*/
    addDialogMessage: (newDialogMessage: string) => (
        { type: "ADD-DIALOG-MESSAGE", newDialogMessage } as const)
}


export default dialogsReducer

export type InitialDialogStateType = typeof initialState
type ActionTypes = InferActionsTypes<typeof dialogsActions>
