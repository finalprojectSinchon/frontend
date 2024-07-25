import AudioPlayer from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css';
// import 'react-h5-audio-player/lib/styles.less' Use LESS
// import 'react-h5-audio-player/src/styles.scss'

const Player = () => (
    <AudioPlayer
        autoPlay={false}
        volume={0.7}
        src="https://file-examples.com/storage/feb35fc29b66a26e8a0fd25/2017/11/file_example_MP3_700KB.mp3"
        onPlay={e => console.log("onPlay")}
        // other props here
    />
);

export default Player