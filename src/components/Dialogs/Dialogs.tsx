import React from 'react';
import classes from "./Dialogs.module.css"
import DialogItem from "./DialogItem/DialogsItem";
import Message from "./Message/Message";
import AddDialogsMessageForm from "./AddDialogMessageForm/AddDialogMessageForm";
import {InitialDialogStateType} from "../../Redux/dialogs-reducer";

type PropsType = {
    dialogsPage: InitialDialogStateType
    addDialogMessage: (newDialogMessage: string) => void
}

export type NewDialogMessageFormValueType = {
    newDialogMessage: string
}
const Dialogs: React.FC<PropsType> = ({addDialogMessage, dialogsPage}) => {

    let onSubmit = (formData: NewDialogMessageFormValueType) => {
        //console.log(formData);
        addDialogMessage(formData.newDialogMessage);
    }

    let dialogsElements = dialogsPage.dialogs.map(d => <DialogItem name={d.name}
                                                                   key={d.id}
                                                                   id={d.id}
                                                                   imgUrl={d.imgUrl}/>);

    let messagesElements = dialogsPage.messages.map(m => <Message key={m.id} message={m.message}/>)

    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogsItems}>
                {dialogsElements}
            </div>
            <div className={classes.messages}>
                {messagesElements}
                <AddDialogsMessageForm onSubmit={onSubmit}/>
            </div>
        </div>
    )
}

export default Dialogs;