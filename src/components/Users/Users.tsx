import Paginator from "./Paginator";
import User from "./User";
import {UserType} from "../../types/types";

type UsersPropsType = {
    totalUsersCount: number
    pageSize: number
    currentPage: number
    users: Array<UserType>
    onPageChanged: (pageNumber: number) => void
    follow: (userId: number) => void
    unfollow: (userId: number) => void
    followInProgress: Array<number>
}
let Users = ({totalUsersCount, pageSize, currentPage,
                 users, onPageChanged, follow, unfollow, followInProgress}: UsersPropsType) => {

    let usersElements = users.map(
        user => (
            <User user={user} key={user.id} follow={follow} unfollow={unfollow} followInProgress={followInProgress} />
        )
    )


    return <div>
        <Paginator totalItemsCount={totalUsersCount}
                   pageSize={pageSize}
                   currentPage={currentPage}
                   onPageChanged={onPageChanged}
                   portionSize={20}
        />

        {usersElements}


        {/* <div className={styles.buttonWrapper}>
                <button onClick={getUsers}>Show more users</button>
            </div>*/}
    </div>
}

export default Users;