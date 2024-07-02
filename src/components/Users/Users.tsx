import React from 'react';
import Paginator from "./Paginator";
import User from "./User";
import {UserType} from "../../types/types";
import {UserSearchForm} from "./UserSearchForm";
import {FilterType} from "../../Redux/users-reducer";

type UsersPropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    users: Array<UserType>
    onPageChanged: (pageNumber: number) => void
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    followInProgress: Array<number>
    onFilterChanged: (filter: FilterType) => void
    filter: FilterType

}

let Users: React.FC<UsersPropsType> = ({
                 totalUsersCount, pageSize, currentPage,
                 users, onPageChanged, follow, unfollow, followInProgress,
                                           onFilterChanged, filter
             }) => {

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