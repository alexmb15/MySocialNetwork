import React from "react";
import Header, {HeaderPropsType} from "./Header";
import {connect} from "react-redux";
import {logOut} from "../../Redux/auth-reducer";
import {AppStateType} from "../../Redux/redux-store";


class HeaderContainer extends React.Component<HeaderPropsType, {}> {

    render() {
        return <Header isAuth={this.props.isAuth} login={this.props.login} logOut={this.props.logOut}/>;
    }
}

const mapStateToProps = (state: AppStateType) => {
    return {
        //userId: state.auth.userId,
        login: state.auth.login,
        //email: state.auth.email,
        isAuth: state.auth.isAuth
    }
}

export default connect(mapStateToProps, {logOut})(HeaderContainer);