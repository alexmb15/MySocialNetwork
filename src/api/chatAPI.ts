let ws: WebSocket
let subscribers = [] as Array<SubscriberType>

let closeHandler = () => {
    console.log('WS Close')
    setTimeout(createChannel, 3000)
}

let messageHandler = (e: MessageEvent) => {
    let newMessages = JSON.parse(e.data);
    console.log(newMessages)
    subscribers.forEach(s => s(newMessages))
}

function createChannel() {
    ws?.removeEventListener('close', closeHandler)
    ws?.removeEventListener('message', messageHandler)
    ws?.close()
    ws = new WebSocket("wss://social-network.samuraijs.com/handlers/ChatHandler.ashx");
    ws.addEventListener('close', closeHandler)
    ws.addEventListener('message', messageHandler)
}

export const chatAPI = {
    start() {
        createChannel()
    },
    stop() {
        subscribers = []
        ws?.removeEventListener('close', closeHandler)
        ws?.removeEventListener('message', messageHandler)
        ws?.close()
    },
    subscribe(callback: SubscriberType) {
        subscribers.push(callback)
        return () => {
            subscribers = subscribers.filter(s => s !== callback)
        }
    },
    unsubscribe(callback: SubscriberType) {
        subscribers = subscribers.filter(s => s !== callback)
    },
    sendMessage(message: string) {
        ws?.send(message)
    }
}

type SubscriberType = (messages: Array<ChatMessageType>) => void
export type ChatMessageType = {
    message: string,
    photo: string,
    userId: number,
    userName: string
}