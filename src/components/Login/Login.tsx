import {InjectedFormProps, reduxForm} from "redux-form";
import {connect} from "react-redux";
import {logIn} from "../../Redux/auth-reducer";
import {maxLength, requiredField} from "../../utils/validators/validators";
import {
    createButton,
    createField,
    createImg,
    createLabel,
    formGeneralError,
    Input
} from "../common/FormsComponent/FormsComponent";
import {Navigate} from "react-router-dom";
import React from "react";
import {AppStateType} from "../../Redux/redux-store";

const maxLength30 = maxLength(30);

type LoginFormOwnProps = {
    captchaURL: string | null;
}

type LoginFormValuesType = {
    email: string;
    password: string;
    rememberMe: boolean;
    captcha: string;
}
type LoginFormValuesKeyType = keyof LoginFormValuesType

let LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps> & LoginFormOwnProps> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            {createLabel("Emal:")}
            {createField("name@mail.com", "email", [requiredField, maxLength30], Input)}

            {createLabel("Password:")}
            {createField("Password", "password", [requiredField, maxLength30], Input, {type: "password"})}

            {createField("", "rememberMe", [], Input, {type: "checkbox"}, "remember me")}

            {createField("", "generalError", [], formGeneralError, {error: props.error})}

            {props.captchaURL && createImg(props.captchaURL)}
            {props.captchaURL && createField("", "captcha", [requiredField], Input)}

            {createButton("Log in")}
        </form>
    );
}

let LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({form: 'login'})(LoginForm);

type MapStatePropsType = {
    isAuth: boolean
    captchaURL: string | null
}
type MapDispatchToPropsType = {
    logIn: (email: string, password: string, rememberMe: boolean, captcha: string) => void
}
let Login: React.FC<MapStatePropsType & MapDispatchToPropsType> = ({isAuth, logIn, captchaURL}) => {
    const onSubmit = (formData: LoginFormValuesType) => {
        //console.log("Form Data: ", formData);
        let {email, password, rememberMe, captcha} = formData;
        //console.log(email, password, rememberMe, captcha);
        logIn(email, password, rememberMe, captcha);
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

const mapStateToProps = (state: AppStateType) => {
    return {
        isAuth: state.auth.isAuth,
        captchaURL: state.auth.captchaURL
    }
}
export default connect(mapStateToProps, {logIn})(Login);