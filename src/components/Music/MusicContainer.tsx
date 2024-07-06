import {connect} from "react-redux";
import Music from "./Music";
import {musicActions} from "../../Redux/music-reducer";
import {AppStateType} from "../../Redux/redux-store";

export type MusicPropsType = ReturnType<typeof mapStateToProps>

const mapStateToProps = (state: AppStateType) => {
    return {
        musicPage: state.musicPage
    }
}

const MusicContainer = connect(mapStateToProps, {
    playSong: musicActions.playSong,
    pauseSong: musicActions.pauseSong,
    stopSong: musicActions.stopSong
})(Music);

export default MusicContainer;