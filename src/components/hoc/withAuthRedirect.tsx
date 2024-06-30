import React from "react";
import {connect} from "react-redux";
import {Navigate} from "react-router-dom";
import {AppStateType} from "../../Redux/redux-store";

let mapStateToPropsForRedirect = (state: AppStateType) => {
    return {
        isAuth: state.auth.isAuth
    }
}

type MapPropsType = ReturnType<typeof mapStateToPropsForRedirect>
type DispatchPropsType = {}

export function withAuthRedirect<WCP extends {}>(Component: React.ComponentType<WCP>) {

    const RedirectComponent: React.FC<MapPropsType & DispatchPropsType> = (props) => {
        let {isAuth, ...restProps} = props;
        if (!isAuth) return <Navigate to={"/Login"}/>
        return <Component {...restProps as WCP}/>
    }

    return connect<MapPropsType, DispatchPropsType, WCP, AppStateType>(mapStateToPropsForRedirect, {})(RedirectComponent);
}
