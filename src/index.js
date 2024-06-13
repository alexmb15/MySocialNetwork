import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from "./reportWebVitals";
import store from "./Redux/redux-store";
import {Provider} from "react-redux";

/*setInterval(() => {
    store.dispatch({type: "FAKE"})
}, 1000);*/

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
   // <React.StrictMode>
        <Provider store={store}>
            <App /*state={state}
                     store={store}*/
                /*dispatch={store.dispatch.bind(store)}*/
                /*updatePostMessage={store.updatePostMessage.bind(store)}
                addPost={store.addPost.bind(store)}
                updateDialogMessage={store.updateDialogMessage.bind(store)}
                addDialogMessage={store.addDialogMessage.bind(store)}*/
            />
        </Provider>
    //</React.StrictMode>
);


// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();