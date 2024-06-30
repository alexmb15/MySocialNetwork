import React from 'react';
import styles from "./ProfileInfo.module.css"
import {ProfileInfoDataType} from "./ProfileInfoDataReduxForm/ProfileInfoDataReduxForm";


export const ProfileInfoData: React.FC<ProfileInfoDataType> = ({userProfile}) => {

    return (
        <div className={styles.profileDetails}>
            <div className={styles.aboutMe}>
                <h2>About Me</h2>
                <p>{userProfile.aboutMe || 'No details provided'}</p>
            </div>
            <div className={styles.lookingForAJob}>
                <h2>Job Status</h2>
                <p>
                    Looking for a job: <span>{userProfile.lookingForAJob ? 'Yes' : 'No'}</span>
                </p>
                {userProfile.lookingForAJob && (
                    <p>{userProfile.lookingForAJobDescription || 'No description provided'}</p>
                )}
            </div>
            <div className={styles.profileContacts}>
                <h3>Contacts</h3>
                {Object.entries(userProfile.contacts).map(([key, value]) => (
                    value && <a key={key} href={value} target="_blank" rel="noopener noreferrer">{key}</a>
                ))}
            </div>
        </div>
    )
}

