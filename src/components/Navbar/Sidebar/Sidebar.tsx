import React, {useEffect} from 'react';
import styles from './Sidebar.module.css';
import {useDispatch, useSelector} from "react-redux";
import {getFriendsSelector} from "../../../Redux/Selectors/user-selectors";
import {getFriends} from "../../../Redux/sidebar-reducer";

type PropsType = {}

export const Sidebar: React.FC<PropsType> = () => {
    let friendsElement = null;
    const friends = useSelector(getFriendsSelector)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getFriends())
    }, [])

    if(friends){
        //console.log(friends)
        friendsElement = friends.map( f => <a key={f.id}> {f.name}</a>);
    }

    return (
        <div className={styles.sidebar}>
            <h3>Friends</h3>
            <div className={styles.friendList}>
                {friendsElement}
            </div>
        </div>
    );
}

export default Sidebar;