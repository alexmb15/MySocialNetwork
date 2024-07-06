import {maxLength, requiredField} from "../../utils/validators/validators";
import {InjectedFormProps, reduxForm} from "redux-form";
import {
    createButton,
    createField,
    createImg,
    createLabel,
    FormGeneralError,
    FormGeneralErrorValuesType,
    Input
} from "../common/FormsComponent/FormsComponent";
import React from "react";

const maxLength30 = maxLength(30);
type LoginFormOwnProps = {
    captchaURL: string | null;
}
export type LoginFormValuesType = {
    email: string
    password: string
    rememberMe: boolean
    captcha: string
}
type LoginFormValuesKeyType = keyof LoginFormValuesType
type FormGeneralErrorValuesKeysType = Extract<keyof FormGeneralErrorValuesType, string>

let LoginForm: React.FC<InjectedFormProps<LoginFormValuesType, LoginFormOwnProps>
    & LoginFormOwnProps> = ({

                                handleSubmit,
                                error,
                                captchaURL
                            }) => {
    return (
        <form onSubmit={handleSubmit}>
            {createLabel("Email:")}
            {createField<LoginFormValuesKeyType>(
                "name@mail.com",
                "email",
                [requiredField, maxLength30],
                Input
            )}

            {createLabel("Password:")}
            {createField<LoginFormValuesKeyType>(
                "Password",
                "password",
                [requiredField, maxLength30],
                Input,
                {type: "password"}
            )}

            {createField<LoginFormValuesKeyType>(
                "",
                "rememberMe",
                [],
                Input,
                {type: "checkbox"},
                "remember me"
            )}

            {createField<FormGeneralErrorValuesKeysType>(
                "",
                "generalError",
                [],
                FormGeneralError,
                {error: error}
            )}

            {captchaURL && createImg(captchaURL)}
            {captchaURL && createField<LoginFormValuesKeyType>(
                "",
                "captcha",
                [requiredField],
                Input
            )}

            {createButton("Log in")}
        </form>
    );
}
export let LoginReduxForm = reduxForm<LoginFormValuesType, LoginFormOwnProps>({form: 'login'})(LoginForm);