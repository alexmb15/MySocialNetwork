import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {logIn} from "../../Redux/auth-reducer";
import {Navigate} from "react-router-dom";
import {LoginFormValuesType, LoginReduxForm} from "./LoginForm";
import {getCaptchaURL, getIsAuth} from "../../Redux/Selectors/user-selectors";

type PropsType = {}

export const Login: React.FC<PropsType> = (props) => {

    const isAuth = useSelector(getIsAuth)
    const captchaURL = useSelector(getCaptchaURL)
    const dispatch = useDispatch()


    const onSubmit = (formData: LoginFormValuesType) => {
        //console.log("Form Data: ", formData);
        let {email, password, rememberMe, captcha} = formData
        //console.log(email, password, rememberMe, captcha);
        dispatch(logIn(email, password, rememberMe, captcha))
    }

    if (isAuth) {
        return <Navigate to={"/profile"}/>
    }
    return (
        <div>
            <h1>LOGIN</h1>
            <LoginReduxForm onSubmit={onSubmit} captchaURL={captchaURL}/>
        </div>
    );
}