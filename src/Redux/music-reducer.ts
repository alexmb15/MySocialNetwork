import {InferActionsTypes} from "./redux-store";

let initialState = {
    playList: [
        {
            id: 1,
            group: "Metallica",
            song: "Orion",
            songUrl: ""
        },
        {
            id: 2,
            group: "Metallica",
            song: "Nothing Else Meter",
            songUrl: ""
        },
        {
            id: 3,
            group: "Depeche Mode",
            song: "It's no good",
            songUrl: ""
        }
    ] as Array<SongType>
};

const musicReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case "PLAY-SONG":
            alert("musicReducer: PLAY");
            return state;

        case "PAUSE-SONG":
            alert("musicReducer: PAUSE");
            return state

        case "STOP-SONG":
            alert("musicReducer: STOP");
            return state;

        default:
            return state;
    }
}

//ActionCreators
export const actions = {
    playSongActionCreator: (songId: number) => ({type: "PLAY-SONG", songId} as const),
    pauseSongActionCreator: (songId: number) => ({type: "PAUSE-SONG", songId} as const),
    stopSongActionCreator: (songId: number) => ({type: "STOP-SONG", songId} as const)
}

export default musicReducer;

type SongType = {
    id: number,
    group: string,
    song: string,
    songUrl: string
}
type InitialStateType = typeof initialState
type ActionTypes = InferActionsTypes<typeof actions>