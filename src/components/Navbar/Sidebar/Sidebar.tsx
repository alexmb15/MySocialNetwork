import React, { useEffect } from "react";
import styles from "./Sidebar.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getFriends } from "../../../Redux/sidebar-reducer";
import { getFriendsSelector } from "../../../Redux/Selectors/sidebar-selectors";
import { Link } from "react-router-dom";   // ← если нужен переход на профиль

export const Sidebar: React.FC = () => {
    const dispatch = useDispatch();
    const friends = useSelector(getFriendsSelector);

    /* 1. Добавили dispatch в dependency-array */
    useEffect(() => {
        dispatch(getFriends());
    }, [dispatch]);

    /* 2. Правильные «ссылки» с href/Link */
    const friendsElement = friends?.map((f) => (
        <Link key={f.id} to={`/profile/${f.id}`} >
            {f.name}
        </Link>
    ));

    return (
        <div className={styles.sidebar}>
            <h3>Friends</h3>
            <div className={styles.friendList}>{friendsElement}</div>
        </div>
    );
};

export default Sidebar;
