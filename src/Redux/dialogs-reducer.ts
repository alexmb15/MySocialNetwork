const ADD_DIALOG_MESSAGE = "ADD-DIALOG-MESSAGE"

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

const dialogsReducer = (state = initialState, action: any): InitialStatType => {
    switch (action.type) {
        case ADD_DIALOG_MESSAGE:
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
type AddDialogMessageActionCreatorType = {
    type: typeof ADD_DIALOG_MESSAGE
    newDialogMessage: string
}
export const addDialogMessageActionCreator = (newDialogMessage: string): AddDialogMessageActionCreatorType => (
    { type: ADD_DIALOG_MESSAGE, newDialogMessage }
)

export default dialogsReducer