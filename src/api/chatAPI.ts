let ws: WebSocket | null = null
let subscribers = {
    'messages': [] as Array<ChatMessagesSubscriberType>,
    'status': [] as Array<StatusSubscriberType>
}

let closeHandler = () => {
    console.log('WS Close')
    notifySubscribersAboutStatus('pending')
    setTimeout(createChannel, 3000)
}
let openHandler = () => {
    console.log('WS OPEN')
    notifySubscribersAboutStatus('ready')
}
let errorHandler = () => {
    console.error('REFRESH PAGE')
    notifySubscribersAboutStatus('error')
}
let messageHandler = (e: MessageEvent) => {
    let newMessages = JSON.parse(e.data);
    console.log(newMessages)
    subscribers["messages"].forEach(s => s(newMessages))
}

const notifySubscribersAboutStatus = (status: StatusType) => {
    subscribers["status"].forEach(s => s(status));
}

function cleanUp() {
    if (ws) {
        ws.removeEventListener('close', closeHandler);
        ws.removeEventListener('message', messageHandler);
        ws.removeEventListener('open', openHandler);
        ws.removeEventListener('error', errorHandler);
    }
}

function createChannel() {
    cleanUp()
    ws?.close()
    ws = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx");
    notifySubscribersAboutStatus('pending')
    ws.addEventListener('open', openHandler)
    ws.addEventListener('close', closeHandler)
    ws.addEventListener('message', messageHandler)
    ws.addEventListener('error', errorHandler)
}

export const chatAPI = {
    start() {
        createChannel()
    },
    stop() {
        subscribers["messages"] = []
        subscribers["status"] = []
        cleanUp()
        ws?.close()
    },
    subscribe(EventName: EventsNameType, callback: ChatMessagesSubscriberType | StatusSubscriberType) {
        //@ts-ignore
        subscribers[EventName].push(callback)
        return () => {
            //@ts-ignore
            subscribers[EventName] = subscribers[EventName].filter(s => s !== callback)
        }
    },
    unsubscribe(EventName: EventsNameType, callback: ChatMessagesSubscriberType | StatusSubscriberType) {
        //@ts-ignore
        subscribers[EventName] = subscribers[EventName].filter(s => s !== callback);
    },
    sendMessage(message: string) {
        ws?.send(message)
    }
}

type ChatMessagesSubscriberType = (messages: Array<ChatMessageAPIType>) => void
type StatusSubscriberType = (status: StatusType) => void
type EventsNameType = "messages" | "status"
export type StatusType = 'pending' | 'ready' | 'error'
export type ChatMessageAPIType = {
    message: string,
    photo: string,
    userId: number,
    userName: string
}