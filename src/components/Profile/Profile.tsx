import React from 'react';
import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";
import {ProfileType} from "../../types/types";


type ProfilePropsType = {
    userProfile: ProfileType | null
    status: string
    isOwner: boolean
    isEditProfileMode: boolean

    setEditProfileMode: (isEdit: boolean) => void
    updateUserStatus: (status: string) => void
    updateUserProfilePhoto: (file: any) => void
    saveProfileInfo: (formData: ProfileType) => void
}
const Profile = ({
                     userProfile, status, isOwner, isEditProfileMode, setEditProfileMode,
                     updateUserStatus, updateUserProfilePhoto, saveProfileInfo
                 }: ProfilePropsType) => {
    return (
        <div>
            <ProfileInfo userData={userProfile}
                         status={status}
                         updateUserStatus={updateUserStatus}
                         isOwner={isOwner}
                         updateUserProfilePhoto={updateUserProfilePhoto}
                         saveProfileInfo={saveProfileInfo}
                         isEditProfileMode={isEditProfileMode}
                         setEditProfileMode={setEditProfileMode}
            />
            <MyPostsContainer/>
        </div>
    );
}

export default Profile;