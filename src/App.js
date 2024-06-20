import './App.css';
import Navbar from './components/Navbar/Navbar';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import News from "./components/News/News";
import Settings from "./components/Settings/Settings";
import DialogsContainer from "./components/Dialogs/DialogsContainer";
import UsersContainer from "./components/Users/UsersContainer";
import MusicContainer from "./components/Music/MusicContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {Component} from "react";
import {connect} from "react-redux";
import {initializeApp} from "./Redux/app-reducer";
import Preloader from "./components/common/Preloader/Preloader";
import {compose} from "redux";
import NewsContainer from "./components/News/NewsContainer";

class App extends Component {

    catchAllUnhandledErrors = (reason, promiseRejectionEvent) => {
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
                    <HeaderContainer/>
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

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
})

export default compose(
    //withRouter,
    connect(mapStateToProps, {initializeApp})
)(App);
