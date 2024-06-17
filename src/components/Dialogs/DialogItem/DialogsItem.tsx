import {NavLink} from "react-router-dom";
import classes from "./../Dialogs.module.css";
import defaultProfilePhoto from "../../../assets/images/UserProfile.png";

type DialogItemPropsType = {
    id: number
    name: string
    imgUrl: string
    key: number
}
const DialogItem = ({id, name, imgUrl}: DialogItemPropsType) => {
    let path = "/Dialogs/" + id;
    return (
        <div className={classes.dialogsItem}>
            <img src={imgUrl != null ? imgUrl : defaultProfilePhoto}/>
            <NavLink to={path}
                     className={navData => navData.isActive ? classes.active : classes.dialogsItem}>
                {name}
            </NavLink>
        </div>
    );
}

export default DialogItem;