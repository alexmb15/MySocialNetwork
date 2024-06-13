import {connect} from "react-redux";
import Music from "./Music";
import {pauseSongActionCreator, playSongActionCreator, stopSongActionCreator} from "../../Redux/music-reducer";

const mapStateToProps = (state) => {
    return {
        musicPage: state.musicPage
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        playSong: (songId) => {
            let action = playSongActionCreator(songId);
            dispatch(action);
        },
        pauseSong: (songId) => {
            let action = pauseSongActionCreator(songId);
            dispatch(action);
        },
        stopSong: (songId) => {
            let action = stopSongActionCreator(songId);
            dispatch(action);
        }
    }
}
const MusicContainer = connect(mapStateToProps, mapDispatchToProps)(Music);

export default MusicContainer;