import styles from "./ProfileInfo.module.css"
import defaultProfilePhoto from "../../../assets/images/UserProfile.png";
import Preloader from "../../common/Preloader/Preloader";
import ProfileStatus from "./ProfileStatusWithHooks";
import {FaCamera} from 'react-icons/fa';
import {ProfileInfoData, ProfileInfoDataEditForm} from "./ProfileInfoData";
import {useState} from "react";

const ProfileInfo = ({
                         userData,
                         status,
                         updateUserStatus,
                         isOwner,
                         updateUserProfilePhoto,
                         saveProfileInfo,
                         isEditProfileMode,
                         setEditProfileMode
                     }) => {
    //const [editMode, setEditMode] = useState(false);

    const onProfilePhotoChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            updateUserProfilePhoto(file);
            //console.log(file);
        }
    };

    const onSubmit = (formData) => {
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
                        <ProfileStatus status={status} updateUserStatus={updateUserStatus}/>
                    </div>
                    <ProfileInfoData userData={userData}/>
                </div>}
        </>

    );
}

export default ProfileInfo;