const Music = (props) => {
    return (
        <div>
            Play List:
            <div>
                { props.musicPage.playList.map( song =>
                    <div key={song.id}> {song.group}: "{song.song}"</div>)
                }
            </div>
            <div>
                <span>
                    <button onClick={props.playSong}> Play </button>
                </span>
                <span>
                    <button onClick={props.pauseSong}> Pause </button>
                </span>
                <span>
                    <button onClick={props.stopSong}> Stop </button>
                </span>
            </div>
        </div>
    )
}

export default Music;