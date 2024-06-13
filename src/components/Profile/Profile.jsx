import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./MyPosts/MyPostsContainer";

const Profile = (props) => {
    return (
        <div>
            <ProfileInfo userData={props.userProfile}
                         status={props.status}
                         updateUserStatus={props.updateUserStatus}
                         isOwner={props.isOwner}
                         updateUserProfilePhoto={props.updateUserProfilePhoto}
                         saveProfileInfo={props.saveProfileInfo}
                         isEditProfileMode={props.isEditProfileMode}
                         setEditProfileMode={props.setEditProfileMode}
            />
            <MyPostsContainer />
        </div>
    );
}

export default Profile;