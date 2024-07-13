import {BaseThunkType, InferActionsTypes} from "./redux-store";
import {chatAPI, ChatMessageAPIType, StatusType} from "../api/chatAPI";
import {Dispatch} from "redux";
import {v1} from 'uuid'

type ChatMessageType = ChatMessageAPIType & {id: string}

let initialState = {
    messages: [] as Array<ChatMessageType>,
    status: 'pending' as StatusType
};

const chatReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case "SN/CHAT/SET_MESSAGES":
            //debugger;
            return {
                ...state,
                messages: [...state.messages, ...action.payload.messages.map( m => ({...m, id: v1()}))]
                    .filter((m, index, array) => index >= array.length - 10)
            }
        case "SN/CHAT/CLEAR_MESSAGES":
            return {
                ...state,
                messages: []
            }
        case "SN/CHAT/SET_STATUS":
            //debugger;
            return {
                ...state,
                status: action.payload.status
            }

        default:
            return state;
    }
}


//ActionCreators

export const chatActions = {
    setMessages: (messages: Array<ChatMessageAPIType>) =>
        ({
            type: "SN/CHAT/SET_MESSAGES",
            payload: {messages}
        } as const),
    clearMessages: () =>
        ({
            type: "SN/CHAT/CLEAR_MESSAGES"
        } as const),
    setStatus: (status: StatusType) =>
        ({
            type: "SN/CHAT/SET_STATUS",
            payload: {status}
        } as const)
}

//ThunkCreators
let _newMessageHandler: ((messages: Array<ChatMessageAPIType>) => void) | null = null
let newMessageHandlerCreator = (dispatch: Dispatch) => {
    if (_newMessageHandler === null)
        _newMessageHandler = (messages) => {
            dispatch(chatActions.setMessages(messages))
        }
    return _newMessageHandler
};

let _statusHandler: ((status: StatusType) => void) | null = null
let statusHandlerCreator = (dispatch: Dispatch) => {
    if (_statusHandler === null)
        _statusHandler = (status) => {
            dispatch(chatActions.setStatus(status))
        }
    return _statusHandler
};

export const startMessageListening = (): ThunkType => {
    return async (dispatch) => {
        chatAPI.start()
        chatAPI.subscribe("messages", newMessageHandlerCreator(dispatch))
        chatAPI.subscribe("status", statusHandlerCreator(dispatch))
    }
}

export const stopMessageListening = (): ThunkType => {
    return async (dispatch) => {
        chatAPI.unsubscribe("messages", newMessageHandlerCreator(dispatch))
        chatAPI.unsubscribe("status", statusHandlerCreator(dispatch))
        chatAPI.stop()
        dispatch(chatActions.clearMessages())
    }
}

export const sendMessage = (message: string): ThunkType => async (dispatch) => {
    chatAPI.sendMessage(message)
}

export default chatReducer;

type InitialStateType = typeof initialState
type ActionTypes = InferActionsTypes<typeof chatActions>
type ThunkType = BaseThunkType<ActionTypes>