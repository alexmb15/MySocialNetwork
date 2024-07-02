import React from "react";
import {connect} from "react-redux";
import {
    follow,
    unfollow,
    getUsers, FilterType
} from "../../Redux/users-reducer";
import {compose} from "redux";
import {
    getCurrentPage,
    getPageSize,
    getStatusFollowInProgress,
    getTotalUsersCount,
    getUsersSelector
} from "../../Redux/Selectors/user-selectors";
import {UserType} from "../../types/types";
import Users from "./Users";
import {AppStateType} from "../../Redux/redux-store";

type MapStateToPropsType = ReturnType<typeof mapStateToProps>
type MapDispatchToPropsType = {
    getUsers: (currentPage: number, pageSize: number, term: string) => void
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}
type UsersPropsType = MapStateToPropsType & MapDispatchToPropsType


class UsersContainer extends React.Component<UsersPropsType, {}> {

    componentDidMount() {
        this.props.getUsers(this.props.currentPage, this.props.pageSize, "");
    }

    onPageChanged = (currentPage: number) => {
        this.props.getUsers(currentPage, this.props.pageSize, this.props.filterTerm);
    }

    onFilterChanged = async (filter: FilterType) => {
        this.props.getUsers(this.props.currentPage, this.props.pageSize, filter.term);
    }

    render() {
        return <Users totalUsersCount={this.props.totalUsersCount}
                      pageSize={this.props.pageSize}
                      currentPage={this.props.currentPage}
                      users={this.props.users}
                      onPageChanged={this.onPageChanged}
                      follow={this.props.follow}
                      unfollow={this.props.unfollow}
                      followInProgress={this.props.followInProgress}
                      onFilterChanged={this.onFilterChanged}
        />
    }

}

const mapStateToProps = (state: AppStateType ) => {
    return {
        users: getUsersSelector(state),
        totalUsersCount: getTotalUsersCount(state),
        pageSize: getPageSize(state),
        currentPage: getCurrentPage(state),
        followInProgress: getStatusFollowInProgress(state),
        filterTerm: state.usersPage.filter.term
    }
}

export default compose(
    //withAuthRedirect,
    connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>
    (mapStateToProps,{follow, unfollow, getUsers}))
(UsersContainer);
