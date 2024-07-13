import React from "react";
import Profile from "./Profile";
import {connect} from "react-redux";
import {
    profileActions,
    getUserProfile,
    getUserStatus,
    saveProfileInfo,
    updateUserProfilePhoto,
    updateUserStatus
} from "../../Redux/profile-reducer";
import {compose} from "redux";
import {PropsWithRouter, withRouter} from "../hoc/withRouter";
import {ProfileType} from "../../types/types";
import {AppStateType} from "../../Redux/redux-store";
import {
    getIsEditProfileModeSelector,
    getUserProfileSelector,
    getUserStatusSelector
} from "../../Redux/Selectors/profile-selectors";
import {getUserIdSelector} from "../../Redux/Selectors/auth-selectors";

type MapStateToPropsType = ReturnType<typeof mapStateToProps>
type MapDispatchToPropsType = {
    getUserProfile: (userId: number) => void
    getUserStatus: (userId: number) => void
    updateUserStatus: (status: string) => void
    updateUserProfilePhoto: (file: any) => void
    saveProfileInfo: (formData: ProfileType) => void
    setEditProfileMode: (isEdit: boolean) => void
}
type PropsType = MapStateToPropsType & MapDispatchToPropsType & PropsWithRouter

class ProfileContainer extends React.Component<PropsType, {}> {

    refreshProfile() {
        let userId = this.props.router.params.userId ? this.props.router.params.userId : this.props.userId;
        //debugger
        if(userId) {
            this.props.getUserProfile(+userId);
            this.props.getUserStatus(+userId);
        }
    }

    componentDidMount() {
        //debugger;
        this.refreshProfile();
    }

    componentDidUpdate(prevProps: PropsType, prevState: ProfileType) {
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

const mapStateToProps = (state: AppStateType) => {
    return {
        userProfile: getUserProfileSelector(state),
        status: getUserStatusSelector(state),
        userId: getUserIdSelector(state),
        isEditProfileMode: getIsEditProfileModeSelector(state)
    }
}

/*let WithRouterProfileContainer = withRouter(ProfileContainer);
export default withAuthRedirect(connect(mapStateToProps, {getUserProfile})(WithRouterProfileContainer));*/

export default compose<React.ComponentType>(
    //withAuthRedirect,
    connect(mapStateToProps,
        {getUserProfile, getUserStatus, updateUserStatus,
            updateUserProfilePhoto, saveProfileInfo, setEditProfileMode: profileActions.setEditProfileMode}),
    withRouter
)(ProfileContainer)