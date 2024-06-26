import React from 'react';
import styles from "./User.module.css";
import defaultProfilePhoto from "../../assets/images/UserProfile.png";
import {NavLink} from "react-router-dom";
import {UserType} from "../../types/types";

type UserPropsType = {
    user: UserType
    followInProgress: Array<number>
    follow: (userId: number) => void
    unfollow: (userId: number) => void
}
let User = ({user, followInProgress, follow, unfollow}: UserPropsType) => {
    return (
        <div className={styles.userCard}>
            <div className={styles.userInfo}>
                <NavLink to={"/Profile/" + user.id}>
                    <img
                        src={user.photos.small != null ? user.photos.small : defaultProfilePhoto}
                        className={styles.avatar}
                        alt="User Avatar"
                    />
                </NavLink>
                <div>
                    <div className={styles.userName}>{user.name}</div>
                    <div className={styles.userStatus}>{user.status}</div>
                </div>
            </div>
            <div className={styles.buttonContainer}>
                {
                    user.followed
                        ? <button disabled={followInProgress.some(id => id === user.id)}
                                  onClick={() => unfollow(user.id)}> Unfollow </button>
                        : <button disabled={followInProgress.some(id => id === user.id)}
                                  onClick={() => follow(user.id)}> Follow </button>
                }
            </div>
        </div>
    );
}

export default User;
