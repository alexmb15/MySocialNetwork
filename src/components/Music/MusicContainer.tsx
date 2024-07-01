import {connect} from "react-redux";
import Music from "./Music";
import {actions} from "../../Redux/music-reducer";
import {AppStateType} from "../../Redux/redux-store";

export type MusicPropsType = ReturnType<typeof mapStateToProps>

const mapStateToProps = (state: AppStateType) => {
    return {
        musicPage: state.musicPage
    }
}

const MusicContainer = connect(mapStateToProps, {
    playSong: actions.playSong,
    pauseSong: actions.pauseSong,
    stopSong: actions.stopSong
})(Music);

export default MusicContainer;