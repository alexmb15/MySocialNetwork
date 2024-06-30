import {InjectedFormProps, reduxForm} from "redux-form";
import {maxLength} from "../../../../utils/validators/validators";
import {createField, Textarea} from "../../../common/FormsComponent/FormsComponent";
import React from "react";

const maxLength50 = maxLength(50);

export type NewPostTextFormValuesType = {
    newPostText: string
}
type PropsType = {}
type NewPostTextValuesKeysType = Extract<keyof NewPostTextFormValuesType, string>

const AddNewPostForm = ({handleSubmit}: InjectedFormProps<NewPostTextFormValuesType, PropsType> & PropsType) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                {createField<NewPostTextValuesKeysType>(
                    "Enter new message",
                    "newPostText",
                    [maxLength50],
                    Textarea)
                }
            </div>
            <div>
                <button>Add post</button>
            </div>
        </form>
    )
}
export const AddNewPostFormRedux = reduxForm<NewPostTextFormValuesType, PropsType>({form: "addNewPostForm"})(AddNewPostForm);