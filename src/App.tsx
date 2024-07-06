import React, {Component} from "react";
import './App.css';
import Navbar from './components/Navbar/Navbar';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Settings from "./components/Settings/Settings";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import {UsersContainer} from "./components/Users/UsersContainer";
import MusicContainer from "./components/Music/MusicContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import Login from "./components/Login/Login";
import {connect} from "react-redux";
import {initializeApp} from "./Redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import {compose} from "redux";
import NewsContainer from "./components/News/NewsContainer";
import {AppStateType} from "./Redux/redux-store";
import Header from "./components/Header/Header";

type StatePropsType = ReturnType<typeof mapStateToProps>
type DispatchPropsType = {
    initializeApp: () => void
}

class App extends Component<StatePropsType & DispatchPropsType, {}> {

    catchAllUnhandledErrors = (promiseRejectionEvent: PromiseRejectionEvent) => {
        alert(promiseRejectionEvent);
    }

    componentDidMount() {
        this.props.initializeApp();
        window.addEventListener("unhandledrejection", this.catchAllUnhandledErrors);
    }

    componentWillUnmount() {
        window.removeEventListener("unhandledrejection", this.catchAllUnhandledErrors);
    }

    render() {
        if(!this.props.initialized) {
            return <Preloader/>
        }

        return (
            <BrowserRouter>
                <div className='app-wrapper'>
                    <Header/>
                    <Navbar/>
                    <div className='app-wrapper-content'>
                        <Routes>
                            <Route path="/" element={<Navigate to="/profile" />} />
                            <Route path='profile' element={<ProfileContainer/>}>
                                <Route path=':userId' element={<ProfileContainer/>}/>
                            </Route>
                            <Route path="/Dialogs/*" element={<DialogsContainer/>}/>
                            <Route path="/Users/*" element={<UsersContainer/>}/>
                            <Route path='/News' element={<NewsContainer/>}/>
                            <Route path='/Music' element={<MusicContainer/>}/>
                            <Route path='/Settings' element={<Settings/>}/>
                            <Route path='/Login' element={<Login/>}/>
                        </Routes>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

const mapStateToProps = (state: AppStateType) => ({
    initialized: state.app.initialized
})

export default compose(
    //withRouter,
    connect(mapStateToProps, {initializeApp})
)(App);
