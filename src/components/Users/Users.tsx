import React, {useEffect} from 'react';
import Paginator from "./Paginator";
import User from "./User";
import {UserSearchForm} from "./UserSearchForm";
import {FilterType, followUser, unfollowUser, getUsers} from "../../Redux/users-reducer";
import {useDispatch, useSelector} from "react-redux";
import {
    getCurrentPage,
    getPageSize,
    getStatusFollowInProgress,
    getTotalUsersCount,
    getUsersFilter,
    getUsersSelector
} from "../../Redux/Selectors/user-selectors";

type UsersPropsType = {}

let Users: React.FC<UsersPropsType> = (props) => {

    const users = useSelector(getUsersSelector)
    const totalUsersCount = useSelector(getTotalUsersCount)
    const pageSize = useSelector(getPageSize)
    const currentPage = useSelector(getCurrentPage)
    const followInProgress = useSelector(getStatusFollowInProgress)
    const filter = useSelector(getUsersFilter)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getUsers(currentPage, pageSize, filter))
    }, [])

    const follow = (userId: number) => {
        dispatch(followUser(userId))
    }

    const unfollow = (userId: number) => {
        dispatch(unfollowUser(userId))
    }

    const onPageChanged = (pageNumber: number) => {
        dispatch(getUsers(pageNumber, pageSize, filter))
    }

    const onFilterChanged = async (filter: FilterType) => {
        dispatch(getUsers(1, pageSize, filter))
    }

    let usersElements = users.map(
        user => (
            <User user={user} key={user.id} follow={follow} unfollow={unfollow} followInProgress={followInProgress}/>
        )
    )

    return <div>
        <UserSearchForm onFilterChanged={onFilterChanged} filter={filter}/>
        {usersElements}

        <Paginator totalItemsCount={totalUsersCount}
                   pageSize={pageSize}
                   currentPage={currentPage}
                   onPageChanged={onPageChanged}
        />
    </div>
}

export default Users;