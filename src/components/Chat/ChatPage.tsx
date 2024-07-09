import React, {useEffect, useState} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import {withAuthRedirect} from "../hoc/withAuthRedirect";
import {useDispatch, useSelector} from "react-redux";
import {sendMessage, startMessageListening, stopMessageListening} from "../../Redux/chat-reducer";
import {getMessageSelector} from "../../Redux/Selectors/user-selectors";

const ChatPage = (props: any) => {
    return (
        <div>
            <Chat/>
        </div>
    );
};

const Chat = (props: any) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(startMessageListening())
        return () => {
            dispatch(stopMessageListening())
        }

    }, [])

    return (
        <div>
            <Messages/>
            <AddNewMessageForm/>
        </div>
    );
};

const Messages: React.FC = () => {
    const messages = useSelector(getMessageSelector)

    return (
        <div style={{height: '800px', overflowY: 'auto'}}>
            {messages.map((m, index) => <Message key={index} message={m}/>)}
        </div>
    );
};

const Message: React.FC<{ message: MessageType }> = ({message}) => {
    return <div>
        <img src={message.photo}/> <b>{message.userName}</b>
        <br/>
        {message.message}
        <hr/>
    </div>
}

const AddNewMessageForm: React.FC<{}> = ({}) => {
    const dispatch = useDispatch()
    const [readyStatus, setReadyStatus] = useState<'pending' | 'ready'>('pending')
    const {register, handleSubmit} = useForm<ChatMessageFormDataType>({
        defaultValues: {
            newMessage: ""
        }
    });


    const onSubmit: SubmitHandler<ChatMessageFormDataType> = (formData) => {
        if (!formData.newMessage) {
            console.log(formData.newMessage)
            return
        }
        debugger
        dispatch(sendMessage(formData.newMessage))
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <textarea {...register("newMessage")} placeholder="Enter new message"/>
            <div>
                <input type="submit"/>
            </div>
        </form>
    );
};

export default withAuthRedirect(ChatPage);

type ChatMessageFormDataType = {
    newMessage: string;
}
type MessageType = {
    message: string,
    photo: string,
    userId: number,
    userName: string
}
