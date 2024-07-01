import classes from "./../Dialogs.module.css"
import React from "react";

type MessagePropsType = {
    message: string
}
const Message: React.FC<MessagePropsType> = ({message}) => {
    return (
        <div className={classes.message}>{message}</div>
    );
}

export default Message;