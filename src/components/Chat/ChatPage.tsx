import React, {useEffect, useRef} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import {withAuthRedirect} from "../hoc/withAuthRedirect";
import {useDispatch, useSelector} from "react-redux";
import {sendMessage, startMessageListening, stopMessageListening} from "../../Redux/chat-reducer";
import styles from './ChatPage.module.css';
import {getUserIdSelector} from "../../Redux/Selectors/auth-selectors";
import {getMessageSelector, getStatusSelector} from "../../Redux/Selectors/chat-selectors";

const ChatPage = (props: any) => {
    return (
        <div className={styles.chatPage}>
            <Chat/>
        </div>
    );
};

const Chat = (props: any) => {
    const dispatch = useDispatch();
    const status = useSelector(getStatusSelector);

    useEffect(() => {
        dispatch(startMessageListening());
        return () => {
            dispatch(stopMessageListening());
        }
    }, [dispatch]);

    return <>{status === "error" && <div>Some error occurred. Please refresh the page!</div>}
            <div className={styles.chat}>
                <Messages/>
                <AddNewMessageForm />
            </div>
        </>
}

const Messages: React.FC = React.memo(() => {
    console.log(">>> Messages!!!")
    const messages = useSelector(getMessageSelector)
    const messagesEndRef = useRef<HTMLDivElement | null>(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth"})
    };

    useEffect(() => {
        scrollToBottom()
    }, [messages])


    return (
        <div className={styles.messages}>
            {messages.map((m) => <Message key={m.id} message={m}/>)}
            <div ref={messagesEndRef} />
        </div>
    )
})

const Message: React.FC<{ message: MessageType }> = React.memo(({message}) => {
    console.log(">>>>> Message")
    const myUserId = useSelector(getUserIdSelector); // Замените на правильный селектор для получения ID текущего пользователя
    const isMyMessage = message.userId === myUserId;

    return (
        <div className={`${styles.message} ${isMyMessage ? styles.mine : ''}`}>
            <img src={message.photo} alt="User avatar"/>
            <div className={styles.messageContent}>
                <b>{message.userName}</b>
                <p>{message.message}</p>
            </div>
        </div>
    )
})

const AddNewMessageForm: React.FC<{}> = () => {
    const dispatch = useDispatch();
    const status = useSelector(getStatusSelector);

    const {register, handleSubmit} = useForm<ChatMessageFormDataType>({
        defaultValues: {
            newMessage: ""
        }
    });

    const onSubmit: SubmitHandler<ChatMessageFormDataType> = (formData) => {
        if (!formData.newMessage) {
            console.log(formData.newMessage);
            return;
        }
        dispatch(sendMessage(formData.newMessage));
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={styles.addNewMessageForm}>
            <textarea {...register("newMessage")} placeholder="Enter new message"/>
            <div>
                <input disabled={status !== 'ready'} type="submit"/>
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
