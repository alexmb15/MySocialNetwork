import React from 'react';
import {NavLink} from "react-router-dom";
import classes from "./../Dialogs.module.css";
import defaultProfilePhoto from "../../../assets/images/UserProfile.png";

type DialogItemPropsType = {
    id: number
    name: string
    imgUrl: string | null
    key: number
}
const DialogItem: React.FC<DialogItemPropsType> = ({id, name, imgUrl}) => {
    let path = "/Dialogs/" + id;
    return (
        <div className={classes.dialogsItem}>
            <img
                src={imgUrl != null ? imgUrl : defaultProfilePhoto}
                alt=""
            />
            <NavLink to={path}
                     className={navData => navData.isActive ? classes.active : classes.dialogsItem}>
                {name}
            </NavLink>
        </div>
    );
}

export default DialogItem;