const ADD_DIALOG_MESSAGE = "ADD-DIALOG-MESSAGE";

let initialState = {
    dialogs:  [
        {
            id: 1,
            name: "Alex",
            imgUrl: null
        }
    ],
    messages: [
        {id: 1, message: "Hi"}
    ],

};

const dialogsReducer = (state = initialState, action) => {
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
            return state;
    }
}

//ActionCreators
export const addDialogMessageActionCreator = (newDialogMessage) => ({ type: ADD_DIALOG_MESSAGE, newDialogMessage });

export default dialogsReducer;