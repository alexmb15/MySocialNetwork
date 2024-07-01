import React from 'react';
import styles from './Sidebar.module.css';
import {SidebarPropsType} from "./SidebarContainer";

const Sidebar: React.FC<SidebarPropsType> = ({sidebar}) => {

    let friendsElement = null;

    if(sidebar.friends){
        friendsElement = sidebar.friends.map( f => <a key={f.id}> {f.name}</a>);
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