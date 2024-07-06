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
import {useSearchParams} from "react-router-dom";

type UsersPropsType = {}
type QueryParamsType = { term?: string; page?: string; friend?: string }

let Users: React.FC<UsersPropsType> = (props) => {

    const users = useSelector(getUsersSelector)
    const totalUsersCount = useSelector(getTotalUsersCount)
    const pageSize = useSelector(getPageSize)
    const currentPage = useSelector(getCurrentPage)
    const followInProgress = useSelector(getStatusFollowInProgress)
    const filter = useSelector(getUsersFilter)
    const dispatch = useDispatch()

    const [searchParams, setSearchParams] = useSearchParams();
    const queryParams: QueryParamsType = {}

    console.log(searchParams)

    useEffect(() => {
        let actualPage = currentPage
        let actualFiler = filter

        if (searchParams.has("page")) actualPage = Number(searchParams.get("page"))
        if (searchParams.has("term")) actualFiler = {...actualFiler, term: searchParams.get("term") as string}
        switch (searchParams.get("friend")) {
            case "null":
                actualFiler = {...actualFiler, friend: null}
                break
            case "true":
                actualFiler = {...actualFiler, friend: true}
                break
            case "false":
                actualFiler = {...actualFiler, friend: false}
                break
        }


        dispatch(getUsers(actualPage, pageSize, actualFiler))
    }, [])

    useEffect(() => {
        if (currentPage !== 1) queryParams.page = String(currentPage)
        if (!!filter.term) queryParams.term = filter.term
        if (filter.friend !== null) queryParams.friend = String(filter.friend)

        setSearchParams(queryParams)
    }, [filter, currentPage])

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