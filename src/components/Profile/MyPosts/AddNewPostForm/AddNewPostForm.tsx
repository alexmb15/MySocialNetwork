import {InjectedFormProps, reduxForm} from "redux-form";
import {maxLength} from "../../../../utils/validators/validators";
import {createField, Textarea} from "../../../common/FormsComponent/FormsComponent";
import React from "react";
import {NewPostTextType} from "../MyPosts";

const maxLength50 = maxLength(50);
type NewPostTextValueKeysType = Extract<keyof NewPostTextType, string>
type PropsType = {}

const AddNewPostForm = ({handleSubmit}: InjectedFormProps<NewPostTextType, PropsType> & PropsType) => {
    return (
        <form onSubmit={handleSubmit}>
            <div>
                {createField<NewPostTextValueKeysType>(
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
export const AddNewPostFormRedux = reduxForm<NewPostTextType>({form: "addNewPostForm"})(AddNewPostForm);