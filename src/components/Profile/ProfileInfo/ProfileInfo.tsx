import React from 'react';
import styles from "./ProfileInfo.module.css"
import defaultProfilePhoto from "../../../assets/images/UserProfile.png";
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatus from "./ProfileStatusWithHooks";
import {FaCamera} from 'react-icons/fa';
import {ProfileInfoData} from "./ProfileInfoData";
import {ProfileType} from "../../../types/types";
import {ProfilePropsType} from "../Profile";
import {ProfileInfoDataEditForm} from "./ProfileInfoDataReduxForm/ProfileInfoDataReduxForm";

const ProfileInfo: React.FC<ProfilePropsType> = ({
                         userProfile,
                         status,
                         updateUserStatus,
                         isOwner,
                         updateUserProfilePhoto,
                         saveProfileInfo,
                         isEditProfileMode,
                         setEditProfileMode
                     }) => {
    //const [editMode, setEditMode] = useState(false);

    const onProfilePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file: any = event.target.files?.[0];
        if (file) {
            updateUserProfilePhoto(file);
            //console.log(file);
        }
    };

    const onSubmit = (formData: ProfileType) => {
        saveProfileInfo(formData);/*.then(() => {
            setEditMode(false);
        }).catch(error => {
            //alert("saveProfileInfo: error: " + error);
        });*/
    }

    if (!userProfile) {
        return <Preloader/>
    }

    return (
        <>
            {isEditProfileMode
                ? <ProfileInfoDataEditForm initialValues={userProfile} userProfile={userProfile} onSubmit={onSubmit}/>
                : <div className={styles.profile}>
                    <div className={styles.profileHeader}>
                        <img src={userProfile.photos.small || defaultProfilePhoto} alt="Profile"/>
                        {isOwner && <>
                            <input
                                type="file"
                                accept="image/*"
                                id="upload-profile-picture"
                                style={{display: 'none'}}
                                onChange={onProfilePhotoChange}
                            />
                            <label htmlFor="upload-profile-picture">
                                <FaCamera className={styles.uploadIcon}/>
                            </label>
                            <button onClick={() => setEditProfileMode(true)}>Edit Profile</button>
                        </>
                        }
                        <h1>{userProfile.fullName}</h1>
                        <ProfileStatus status={status} updateUserStatus={updateUserStatus} isOwner={isOwner}/>
                    </div>
                    <ProfileInfoData userProfile={userProfile}/>
                </div>}
        </>

    );
}

export default ProfileInfo;