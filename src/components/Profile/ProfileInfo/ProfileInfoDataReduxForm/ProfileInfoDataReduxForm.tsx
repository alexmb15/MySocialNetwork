import {ProfileType} from "../../../../types/types";
import {
    createField,
    FormGeneralError,
    FormGeneralErrorValuesType,
    Input,
    Textarea
} from "../../../common/FormsComponent/FormsComponent";
import React from "react";
import {InjectedFormProps, reduxForm} from "redux-form";
import styles from "../ProfileInfo.module.css";
import {maxLength, requiredField} from "../../../../utils/validators/validators";

const maxLength300 = maxLength(300);
export type ProfileInfoDataType = {
    userProfile: ProfileType
}
type ProfileValuesKeysType = Extract<keyof ProfileType, string>
type FormGeneralErrorValuesKeysType = Extract<keyof FormGeneralErrorValuesType, string>

export const ProfileInfoDataReduxForm: React.FC<InjectedFormProps<ProfileType, ProfileInfoDataType>
    & ProfileInfoDataType> = ({
                                  handleSubmit,
                                  userProfile,
                                  error
                              }) => {
    return (
        <form onSubmit={handleSubmit} className={styles.profileForm}>
            {createField<FormGeneralErrorValuesKeysType>("", "generalError", [], FormGeneralError, {error: error})}
            <div>
                <label>Full Name</label>
                {createField<ProfileValuesKeysType>("Full name", "fullName", [requiredField], Input)}
            </div>
            <div>
                <label>About Me</label>
                {createField<ProfileValuesKeysType>("About me", "aboutMe", [maxLength300], Textarea)}
            </div>
            <div className={styles.checkboxContainer}>
                <label>Looking for a Job</label>
                {createField<ProfileValuesKeysType>("Looking for a job",
                    "lookingForAJob", [], Input, {type: "checkbox"})}
            </div>
            <div>
                <label>Job Description</label>
                {createField<ProfileValuesKeysType>("looking for a job description",
                    "lookingForAJobDescription",
                    [maxLength300], Textarea)
                }
            </div>
            <div>
                <label>Contacts: </label>
                <div className={styles.contactField}>
                    {Object.keys(userProfile.contacts).map(key => {
                        return <div key={key}>
                            {key}:{createField(key, "contacts." + key, [], Input,)}
                        </div>
                    })}
                </div>
            </div>
            <button type="submit">Save</button>
        </form>
    );
}

export const ProfileInfoDataEditForm = reduxForm<ProfileType, ProfileInfoDataType>({
    form: 'edit-profile', // имя формы в состоянии Redux
})(ProfileInfoDataReduxForm);
