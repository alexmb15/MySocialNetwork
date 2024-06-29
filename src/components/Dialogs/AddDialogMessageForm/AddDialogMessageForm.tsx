import React from "react";
import {maxLength} from "../../../utils/validators/validators";
import {InjectedFormProps, reduxForm} from "redux-form";
import classes from "../Dialogs.module.css";
import {createField, Textarea} from "../../common/FormsComponent/FormsComponent";
import {NewDialogMessageFormValueType} from "../Dialogs";


const maxLength50 = maxLength(50);
type NewDialogMessageFormValueKeysType = Extract<keyof NewDialogMessageFormValueType, string>
type PropsType = {}

const AddDialogsMessage: React.FC<InjectedFormProps<NewDialogMessageFormValueType, PropsType> & PropsType> = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div className={classes.newMessage}>
                {createField<NewDialogMessageFormValueKeysType>(
                    "Enter new message",
                    'newDialogMessage',
                    [maxLength50],
                    Textarea)
                }
            </div>
            <div>
                <button>Add message</button>
            </div>
        </form>
    )
}
export default reduxForm<NewDialogMessageFormValueType>({form: "addDialogMessageForm"})(AddDialogsMessage);