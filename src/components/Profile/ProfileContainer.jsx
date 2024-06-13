import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {
    getUserProfile,
    getUserStatus,
    saveProfileInfo, setEditProfileMode,
    updateUserProfilePhoto,
    updateUserStatus
} from "../../Redux/profile-reducer";
import {compose} from "redux";
import {withRouter} from "../hoc/withRouter";

class ProfileContainer extends React.Component {

    refreshProfile() {
        let userId = this.props.router.params.userId ? this.props.router.params.userId : this.props.userId;
        if(userId) {
            this.props.getUserProfile(userId);
            this.props.getUserStatus(userId);
        }
    }

    componentDidMount() {
        //debugger;
        this.refreshProfile();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if(this.props.router.params.userId !== prevProps.router.params.userId){
            this.refreshProfile();
        }
    }

    render() {
        return <Profile userProfile={this.props.userProfile}
                        status={this.props.status}
                        updateUserStatus={this.props.updateUserStatus}
                        isOwner={!this.props.router.params.userId}
                        updateUserProfilePhoto={this.props.updateUserProfilePhoto}
                        saveProfileInfo={this.props.saveProfileInfo}
                        isEditProfileMode={this.props.isEditProfileMode}
                        setEditProfileMode={this.props.setEditProfileMode}

        />
    }
}

const mapStateToProps = (state) => {
    return {
        userProfile: state.profilePage.userProfile,
        status: state.profilePage.status,
        userId: state.auth.userId,
        isEditProfileMode: state.profilePage.isEditProfileMode
    }
}

/*let WithRouterProfileContainer = withRouter(ProfileContainer);
export default withAuthRedirect(connect(mapStateToProps, {getUserProfile})(WithRouterProfileContainer));*/

export default compose(
    //withAuthRedirect,
    connect(mapStateToProps,
        {getUserProfile, getUserStatus, updateUserStatus,
            updateUserProfilePhoto, saveProfileInfo, setEditProfileMode}),
    withRouter
)(ProfileContainer)