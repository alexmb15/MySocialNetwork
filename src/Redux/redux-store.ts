import {ThunkAction} from "redux-thunk";
import {Action, compose, combineReducers} from "redux";
import profileReducer from "./profile-reducer";
import dialogsReducer from "./dialogs-reducer";
import sidebarReducer from "./sidebar-reducer";
import usersReducer from "./users-reducer";
import musicReducer from "./music-reducer";
import authReducer from "./auth-reducer";
import {reducer as formReducer} from "redux-form";
import appReducer from "./app-reducer";
import {configureStore} from "@reduxjs/toolkit";


let rootReducer = combineReducers({
    profilePage: profileReducer,
    dialogsPage: dialogsReducer,
    usersPage: usersReducer,
    musicPage: musicReducer,
    sidebar: sidebarReducer,
    auth: authReducer,
    app: appReducer,
    form: formReducer
})

//const composeEnhancers = /*window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ||*/ compose
//const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleware)))

const store = configureStore({
    reducer: rootReducer
})

//@ts-ignore
window.store = store;
export default store;

type RootReducerType = typeof rootReducer;

export type AppStateType = ReturnType<RootReducerType>;
export type InferActionsTypes<T> = T extends { [keys: string]: (...args: any[]) => infer U } ? U : never
export type BaseThunkType<A extends Action = Action, R = Promise<void>> = ThunkAction<R, AppStateType, unknown, A>
