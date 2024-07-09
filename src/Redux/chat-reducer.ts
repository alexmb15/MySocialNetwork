import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {chatAPI, ChatMessageType} from "../api/chatAPI";
import {Dispatch} from "redux";

let initialState = {
    messages: [] as Array<ChatMessageType>
};

const chatReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {

        case "SN/CHAT/SET_MESSAGES":
            //debugger;
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages]
            }

        default:
            return state;
    }
}


//ActionCreators

export const chatActions = {
    setMessages: (messages: Array<ChatMessageType>) =>
        ({
            type: "SN/CHAT/SET_MESSAGES",
            payload: {messages}
        } as const)
}

//ThunkCreators
let _newMessageHandler: ((messages: Array<ChatMessageType>) => void) | null = null

let newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null)
        _newMessageHandler = (messages) => {
        debugger
            dispatch(chatActions.setMessages(messages))
        }
    return _newMessageHandler
};

export const startMessageListening = (): ThunkType => {
    return async (dispatch) => {
        chatAPI.start()
        chatAPI.subscribe(newMessageHandlerCreator(dispatch))
    }
}

export const stopMessageListening = (): ThunkType => {
    return async (dispatch) => {
        chatAPI.unsubscribe(newMessageHandlerCreator(dispatch))
        chatAPI.stop()
    }
}

export const sendMessage = (message: string): ThunkType => async (dispatch) => {
    chatAPI.sendMessage(message)
}

export default chatReducer;

type InitialStateType = typeof initialState
type ActionTypes = InferActionsTypes<typeof chatActions>
type ThunkType = BaseThunkType<ActionTypes>