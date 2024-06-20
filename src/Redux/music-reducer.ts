const PLAY_SONG = "PLAY-SONG";
const PAUSE_SONG = "PAUSE-SONG";
const STOP_SONG = "STOP-SONG";

type SongType = {
    id: number,
    group: string,
    song: string,
    songUrl: string
}

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
            group: "Король и Шут",
            song: "Отражение",
            songUrl: ""
        },
        {
            id: 4,
            group: "Depeche Mode",
            song: "It's no good",
            songUrl: ""
        },
        {
            id: 5,
            group: "Кино",
            song: "Бездельник",
            songUrl: ""
        }
    ] as Array<SongType>
};

type InitialStateType = typeof initialState

const musicReducer = (state = initialState, action: ActionTypes): InitialStateType => {
    switch (action.type) {
        case PLAY_SONG:
            alert("musicReducer: PLAY");
            return state;

        case PAUSE_SONG:
            alert("musicReducer: PAUSE");
            return state

        case STOP_SONG:
            alert("musicReducer: STOP");
            return state;

        default:

            return state;
    }
}

//ActionCreators
type ActionTypes = PlaySongActionCreatorType |  PauseSongActionCreatorType | StopSongActionCreator

type PlaySongActionCreatorType = {
    type: typeof PLAY_SONG
    songId: number
}
export const playSongActionCreator = (songId: number): PlaySongActionCreatorType => ({ type: PLAY_SONG, songId });

type PauseSongActionCreatorType = {
    type: typeof PAUSE_SONG
    songId: number
}
export const pauseSongActionCreator = (songId: number): PauseSongActionCreatorType => ({ type: PAUSE_SONG, songId });

type StopSongActionCreator = {
    type: typeof STOP_SONG
    songId: number
}
export const stopSongActionCreator = (songId: number):StopSongActionCreator => ({ type: STOP_SONG, songId });


export default musicReducer;