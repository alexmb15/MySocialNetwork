import {reduxForm} from "redux-form";
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

const maxLength30 = maxLength(30);

let LoginForm = (props) => {
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

let LoginReduxForm = reduxForm({form: 'login'})(LoginForm);

let Login = ({isAuth, logIn, captchaURL}) => {
    const onSubmit = (formData) => {
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

const mapStateToProps = (state) => {
    return {
        isAuth: state.auth.isAuth,
        captchaURL: state.auth.captchaURL
    }
}
export default connect(mapStateToProps, {logIn})(Login);