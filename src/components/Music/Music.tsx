import React, { useState } from "react";
import { MusicPropsType } from "./MusicContainer";
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
import StopIcon from '@mui/icons-material/Stop';
import styles from './Music.module.css';

type DispatchProps = {
    playSong: (songId: number) => void;
    pauseSong: (songId: number) => void;
    stopSong: (songId: number) => void;
};

const Music: React.FC<MusicPropsType & DispatchProps> = (props) => {
    const [selectedSongId, setSelectedSongId] = useState<number | null>(null);
    const [isPlaying, setIsPlaying] = useState<boolean>(false);

    const handleSelectSong = (songId: number) => {
        setSelectedSongId(songId);
        setIsPlaying(false); // Reset playing state when selecting a new song
    };

    const handlePlay = () => {
        if (selectedSongId !== null) {
            props.playSong(selectedSongId);
            setIsPlaying(true);
        }
    };

    const handlePause = () => {
        if (selectedSongId !== null) {
            props.pauseSong(selectedSongId);
            setIsPlaying(false);
        }
    };

    const handleStop = () => {
        if (selectedSongId !== null) {
            props.stopSong(selectedSongId);
            setIsPlaying(false);
        }
    };

    return (
        <Box className={styles.container}>
            <Typography variant="h4" component="h2" className={styles.title}>
                Play List
            </Typography>
            <List>
                {props.musicPage.playList.map((song) => (
                    <div
                        key={song.id}
                        className={`${styles.listItemButton} ${selectedSongId === song.id ? styles.listItemButtonSelected : ''}`}
                        onClick={() => handleSelectSong(song.id)}
                    >
                        <ListItemText primary={`${song.group}: "${song.song}"`} />
                    </div>
                ))}
            </List>
            <Box className={styles.buttonContainer}>
                <button
                    className={styles.button}
                    onClick={handlePlay}
                    disabled={selectedSongId === null || isPlaying}
                >
                    <PlayArrowIcon />
                    Play
                </button>
                <button
                    className={styles.button}
                    onClick={handlePause}
                    disabled={selectedSongId === null || !isPlaying}
                >
                    <PauseIcon />
                    Pause
                </button>
                <button
                    className={styles.button}
                    onClick={handleStop}
                    disabled={selectedSongId === null || !isPlaying}
                >
                    <StopIcon />
                    Stop
                </button>
            </Box>
        </Box>
    );
};

export default Music;
