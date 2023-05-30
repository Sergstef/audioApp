const React = require('react');

const PlayerButton = require('./PlayerButton/PlayerButton');
const PlayerProgress = require('./PlayerProgress/PlayerProgress');
const PlayerBottom = require('./PlayerBottom/PlayerBottom');

const PlayerItem = ({ inputValue, setIsSubmitted, isVideo }) => {
    const audioRef = React.useRef();
    const progressBarRef = React.useRef();
    const playAnimationRef = React.useRef();
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [timeProgress, setTimeProgress] = React.useState(0);
    const [duration, setDuration] = React.useState(0);
    const [volume, setVolume] = React.useState(60);

    React.useEffect(() => {
        if (audioRef) {
          audioRef.current.volume = volume / 100;
        }
      }, [volume, audioRef]);

    React.useEffect(() => {
        if (isPlaying) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }
    }, [isPlaying, audioRef]);

    const repeat = React.useCallback(() => {
        const currentTime = audioRef.current.currentTime;
        setTimeProgress(currentTime);
        progressBarRef.current.value = currentTime;
        progressBarRef.current.style.setProperty(
          '--range-progress',
          `${(progressBarRef.current.value / duration) * 100}%`
        );
    
        playAnimationRef.current = requestAnimationFrame(repeat);
    }, [audioRef, duration, progressBarRef, setTimeProgress]);

    React.useEffect(() => {
        if (isPlaying) {
            audioRef.current.play();
        } else {
            audioRef.current.pause();
        }

        playAnimationRef.current = requestAnimationFrame(repeat);
    }, [isPlaying, audioRef, repeat]);

    const togglePlayPause = () => {
        setIsPlaying((prev) => !prev);
    };

    const onLoadedMetadata = () => {
        const seconds = audioRef.current.duration;
        setDuration(seconds);
        progressBarRef.current.max = seconds;
    };

    return <div>
        <div onClick={() => setIsSubmitted(false)} className='player_back'></div>
        {isVideo && <video ref={audioRef} src={inputValue} onLoadedMetadata={onLoadedMetadata} className='video_player' />}
        <div className='player_display'>
            <PlayerButton togglePlayPause={togglePlayPause} isPlaying={isPlaying} />    
            <PlayerProgress audioRef={audioRef} progressBarRef={progressBarRef} inputValue={inputValue} isVideo={isVideo} onLoadedMetadata={onLoadedMetadata} />
            <PlayerBottom timeProgress={timeProgress} volume={volume} setVolume={setVolume} />
        </div>
    </div>;
}

module.exports = PlayerItem;