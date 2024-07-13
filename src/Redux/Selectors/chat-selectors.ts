import {AppStateType} from "../redux-store";

export const getMessageSelector = (state: AppStateType) => {
    return state.chat.messages;
}
export const getStatusSelector = (state: AppStateType) => {
    return state.chat.status;
}