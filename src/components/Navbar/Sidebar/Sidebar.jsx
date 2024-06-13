import React from 'react';
import styles from './Sidebar.module.css';

const Sidebar = (props) => {

    let friendsElement = null;

    if(props.sidebar.friends){
        friendsElement = props.sidebar.friends.map( f => <a key={f.id}> {f.name}</a>);
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