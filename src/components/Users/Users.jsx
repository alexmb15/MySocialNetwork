import Paginator from "./Paginator";
import User from "./User";

let Users = (props) => {

    let usersElements = props.users.map(
        user => (
            <User user={user} key={user.id} {...props} />
        )
    )


    return <div>
        <Paginator totalItemsCount={props.totalUsersCount}
                   pageSize={props.pageSize}
                   currentPage={props.currentPage}
                   onPageChanged={props.onPageChanged}
                   portionSize={20}
        />

        {usersElements}


        {/* <div className={styles.buttonWrapper}>
                <button onClick={getUsers}>Show more users</button>
            </div>*/}
    </div>
}

export default Users;