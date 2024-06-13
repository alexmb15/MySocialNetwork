import {NavLink} from "react-router-dom";
import classes from "./../Dialogs.module.css";
import defaultProfilePhoto from "../../../assets/images/UserProfile.png";

const DialogItem = (props) => {
    let path = "/Dialogs/" + props.id;
    return (
        <div className={classes.dialogsItem}>
            <img src={props.imgUrl != null ? props.imgUrl : defaultProfilePhoto}/>
            <NavLink to={path}
                     className={navData => navData.isActive ? classes.active : classes.dialogsItem}>
                {props.name}
            </NavLink>
        </div>
    );
}

export default DialogItem;