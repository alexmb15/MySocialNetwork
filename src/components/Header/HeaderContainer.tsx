import React from "react";
import Header from "./Header";
import {connect} from "react-redux";
import {logOut} from "../../Redux/auth-reducer";
import {AppStateType} from "../../Redux/redux-store";

type MapStateToPropsType = ReturnType<typeof mapStateToProps>
type MapDispatchToProps = {
    logOut: () => void
}
type PropsType = MapStateToPropsType & MapDispatchToProps
class HeaderContainer extends React.Component<PropsType,{}> {

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