import styles from "./ProfileInfo.module.css"
import {reduxForm} from "redux-form";
import {createField, formGeneralError, Input, Textarea} from "../../common/FormsComponent/FormsComponent";
import {maxLength, requiredField} from "../../../utils/validators/validators";

const maxLength30 = maxLength(30);

export const ProfileInfoData = ({userData}) => {

    return (
        <div className={styles.profileDetails}>
            <div className={styles.aboutMe}>
                <h2>About Me</h2>
                <p>{userData.aboutMe || 'No details provided'}</p>
            </div>
            <div className={styles.lookingForAJob}>
                <h2>Job Status</h2>
                <p>
                    Looking for a job: <span>{userData.lookingForAJob ? 'Yes' : 'No'}</span>
                </p>
                {userData.lookingForAJob && (
                    <p>{userData.lookingForAJobDescription || 'No description provided'}</p>
                )}
            </div>
            <div className={styles.profileContacts}>
                <h3>Contacts</h3>
                {Object.entries(userData.contacts).map(([key, value]) => (
                    value && <a key={key} href={value} target="_blank" rel="noopener noreferrer">{key}</a>
                ))}
            </div>
        </div>
    )
}

const ProfileInfoDataReduxForm = ({handleSubmit, userData, error}) => {
    return (
        <form onSubmit={handleSubmit} className={styles.profileForm}>
            {createField("", "generalError", [], formGeneralError, {error: error})}
            <div>
                <label>Full Name</label>
                {createField("Full name", "fullName", [requiredField], Input)}
            </div>
            <div>
                <label>About Me</label>
                {createField("About me", "aboutMe", [maxLength30], Textarea)}
            </div>
            <div className={styles.checkboxContainer}>
                <label>Looking for a Job</label>
                {createField("Looking for a job",
                    "lookingForAJob", [], Input, {type: "checkbox"})}
            </div>
            <div>
                <label>Job Description</label>
                {createField("looking for a job description",
                    "lookingForAJobDescription",
                    [maxLength30], Textarea)
                }
            </div>
            <div>
                <label>Contacts: </label>
                <div className={styles.contactField}>
                    {Object.keys(userData.contacts).map(key => {
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
export const ProfileInfoDataEditForm = reduxForm({
    form: 'edit-profile', // имя формы в состоянии Redux
})(ProfileInfoDataReduxForm);
