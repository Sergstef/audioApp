const React = require('react');

const PlayerButton = require('./PlayerButton/PlayerButton');
const PlayerProgress = require('./PlayerProgress/PlayerProgress');
const PlayerBottom = require('./PlayerBottom/PlayerBottom');

const AudioItem = ({ inputValue, setIsSubmitted }) => {
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

    return <div>
        <div onClick={() => setIsSubmitted(false)} className='audio_back'></div>
        <div className='audio_player'>
            <div className="player_animation">

            </div>
            <PlayerButton togglePlayPause={togglePlayPause} isPlaying={isPlaying} />    
            <PlayerProgress audioRef={audioRef} progressBarRef={progressBarRef} setDuration={setDuration} inputValue={inputValue} />
            <PlayerBottom timeProgress={timeProgress} volume={volume} setVolume={setVolume} />
        </div>
    </div>;
}

module.exports = AudioItem;