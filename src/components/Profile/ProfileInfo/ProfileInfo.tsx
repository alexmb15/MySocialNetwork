import React from 'react';
import styles from "./ProfileInfo.module.css"
import defaultProfilePhoto from "../../../assets/images/UserProfile.png";
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatus from "./ProfileStatusWithHooks";
import {FaCamera} from 'react-icons/fa';
import {ProfileInfoData, ProfileInfoDataEditForm} from "./ProfileInfoData";
import {ProfileType} from "../../../types/types";


type ProfileInfoPropsType = {
    userData: ProfileType | null
    status: string
    isOwner: boolean
    isEditProfileMode: boolean

    setEditProfileMode: (isEdit: boolean) => void
    updateUserStatus: (status: string) => void
    updateUserProfilePhoto: (file: any) => void
    saveProfileInfo: (formData: ProfileType) => void
}
const ProfileInfo = ({
                         userData,
                         status,
                         updateUserStatus,
                         isOwner,
                         updateUserProfilePhoto,
                         saveProfileInfo,
                         isEditProfileMode,
                         setEditProfileMode
                     }: ProfileInfoPropsType) => {
    //const [editMode, setEditMode] = useState(false);

    const onProfilePhotoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file: any = event.target.files?.[0];
        if (file) {
            updateUserProfilePhoto(file);
            //console.log(file);
        }
    };

    const onSubmit = (formData: any) => {
        saveProfileInfo(formData);/*.then(() => {
            setEditMode(false);
        }).catch(error => {
            //alert("saveProfileInfo: error: " + error);
        });*/
    }

    if (!userData) {
        return <Preloader/>
    }

    return (
        <>
            {isEditProfileMode
                ? <ProfileInfoDataEditForm initialValues={userData} userData={userData} onSubmit={onSubmit}/>
                : <div className={styles.profile}>
                    <div className={styles.profileHeader}>
                        <img src={userData.photos.small || defaultProfilePhoto} alt="Profile"/>
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
                        <h1>{userData.fullName}</h1>
                        <ProfileStatus status={status} updateUserStatus={updateUserStatus} isOwner={isOwner}/>
                    </div>
                    <ProfileInfoData userData={userData}/>
                </div>}
        </>

    );
}

export default ProfileInfo;