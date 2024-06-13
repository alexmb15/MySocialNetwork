const PLAY_SONG = "PLAY-SONG";
const PAUSE_SONG = "PAUSE-SONG";
const STOP_SONG = "STOP-SONG";

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
    ]
};

const musicReducer = (state = initialState, action) => {
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
export const playSongActionCreator = (songId) => ({ type: PLAY_SONG, songId });
export const pauseSongActionCreator = (songId) => ({ type: PAUSE_SONG, songId });
export const stopSongActionCreator = (songId) => ({ type: STOP_SONG, songId });


export default musicReducer;