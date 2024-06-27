import {connect} from "react-redux";
import Music from "./Music";
import {actions} from "../../Redux/music-reducer";

const mapStateToProps = (state) => {
    return {
        musicPage: state.musicPage
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        playSong: (songId) => {
            let action = actions.playSongActionCreator(songId);
            dispatch(action);
        },
        pauseSong: (songId) => {
            let action = actions.pauseSongActionCreator(songId);
            dispatch(action);
        },
        stopSong: (songId) => {
            let action = actions.stopSongActionCreator(songId);
            dispatch(action);
        }
    }
}
const MusicContainer = connect(mapStateToProps, mapDispatchToProps)(Music);

export default MusicContainer;