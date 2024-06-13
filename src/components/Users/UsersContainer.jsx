import React from "react";
import {connect} from "react-redux";
import Users from "./Users.jsx";
import {
    follow,
    unfollow,
    getUsers
} from "../../Redux/users-reducer";
import {compose} from "redux";
import {
    getCurrentPage,
    getPageSize,
    getStatusFollowInProgress,
    getTotalUsersCount,
    getUsersSelector
} from "../../Redux/Selectors/user-selectors";

class UsersContainer extends React.Component {

    componentDidMount() {
          /*  userAPI.getUsers(this.props.currentPage, this.props.pageSize).then(data => {
                //debugger;
                this.props.setUsers(data.items);
                this.props.setTotalUsersCount(data.totalCount);
            });*/
        this.props.getUsers(this.props.currentPage, this.props.pageSize);
    }

    onPageChanged = (currentPage) => {
        /*this.props.setCurrentPage(currentPage);
        /!*axios.get(`https://social-network.samuraijs.com/api/1.0/users?page=${currentPage}&count=${this.props.pageSize}`, {
            withCredentials: true
        })*!/
            userAPI.getUsers(currentPage, this.props.pageSize).then(data => {
                //debugger;
                this.props.setUsers(data.items);
            });*/
        this.props.getUsers(currentPage, this.props.pageSize);
    }

   /* onFollowUser = (userId) => {
       /!* this.props.toggleFollowingProgress(true,  userId);
        followAPI.follow(userId).then(data => {
            //debugger;
            if (data.resultCode === 0) {
                this.props.followUser(userId);
            }
            this.props.toggleFollowingProgress(false,  userId);
        }).catch(error => {
            alert("onFollow: error: " + error);
        });*!/
        this.props.follow(userId)
    }*/

    /*onUnfollowUser = (userId) => {
        /!*this.props.toggleFollowingProgress(true,  userId);
        followAPI.unFollow(userId).then(data => {
            //debugger;
            if (data.resultCode === 0) {
                this.props.unfollowUser(userId);
            }
            this.props.toggleFollowingProgress(false,  userId);
        }).catch(error => {
            alert("onUnfollow: error: " + error);
        });*!/
        this.props.unfollow(userId);
    }*/

    render() {
        return <Users totalUsersCount={this.props.totalUsersCount}
                      pageSize={this.props.pageSize}
                      currentPage={this.props.currentPage}
                      users={this.props.users}
                      onPageChanged={this.onPageChanged}
                      /*onFollowUser={this.onFollowUser}
                      onUnfollowUser={this.onUnfollowUser}*/
                      follow={this.props.follow}
                      unfollow={this.props.unfollow}
                      followInProgress={this.props.followInProgress}
        />
    }

}

/*const mapStateToProps = (state) => {
    return {
        users: state.userPage.users,
        totalUsersCount: state.usersPage.totalUsersCount,
        pageSize: state.usersPage.pageSize,
        currentPage: state.usersPage.currentPage,
        followInProgress: state.usersPage.followInProgress
    }
}*/

const mapStateToProps = (state) => {
    return {
        users: getUsersSelector(state),
        totalUsersCount: getTotalUsersCount(state),
        pageSize: getPageSize(state),
        currentPage: getCurrentPage(state),
        followInProgress: getStatusFollowInProgress(state)
    }
}

/*const mapDispatchToProps = (dispatch) => {
    return {
        setUsers: (users) => {
            let action = setUsersActionCreator(users)
            dispatch(action);
        },
        followUser: (userId) => {
            dispatch(followActionCreator(userId));
        },
        unFollowUser: (userId) => {
            dispatch(unfollowActionCreator(userId));
        },
        setTotalUsersCount: (totalUsersCount) => {
            dispatch(setTotalUsersCountActionCreator(totalUsersCount));
        },
        setCurrentPage: (currentPage) => {
            dispatch(setCurrentPageActionCreator(currentPage));
        },

    }
}*/

export default compose(
    //withAuthRedirect,
    connect(mapStateToProps,{ follow, unfollow, getUsers}))
(UsersContainer);

//export default withAuthRedirect(connect(mapStateToProps,{ follow, unfollow, getUsers})(UsersContainer));

