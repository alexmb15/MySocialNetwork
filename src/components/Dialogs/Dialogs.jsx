import classes from "./Dialogs.module.css"
import DialogItem from "./DialogItem/DialogsItem";
import Message from "./Message/Message";
import {Field, reduxForm} from "redux-form";
import {Textarea} from "../common/FormsComponent/FormsComponent";
import {maxLength} from "../../utils/validators/validators";

const maxLength20 = maxLength(20);

const AddDialogsMessage = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div className={classes.newMessage}>
                    <Field component={Textarea}
                           validate={[maxLength20]}
                           name="newDialogMessage"
                           placeholder="New message"
                           //value=""
                    />
            </div>
            <div>
                <button>Add message</button>
            </div>
        </form>
    )
}

const AddDialogsMessageRedux = reduxForm({form: "addDialogMessageForm"})(AddDialogsMessage);

const Dialogs = ({addDialogMessage, dialogsPage}) => {

  /*  let onAddDialogsMessage = () => {
        props.addDialogMessage();
    }*/

   /* let onDialogMessageChange = (e) => {
        props.updateDialogMessage(e.target.value);
    }*/

    let onSubmit = (formData) => {
        console.log(formData);
        addDialogMessage(formData.newDialogMessage);
        //formData.target.reset();
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
                <AddDialogsMessageRedux onSubmit={onSubmit} newDialogMessage={dialogsPage.newDialogMessage}/>
            </div>
        </div>
    )
}

export default Dialogs;