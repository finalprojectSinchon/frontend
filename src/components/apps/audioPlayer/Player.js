import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
// import 'react-h5-audio-player/lib/styles.less' Use LESS
// import 'react-h5-audio-player/src/styles.scss'

const Player = () => (
    <AudioPlayer
        autoPlay={false}
        volume={0.7}
        src="/music/miruni.mp3"
        onPlay={e => console.log("onPlay")}
        // other props here
    />
);

export default Player