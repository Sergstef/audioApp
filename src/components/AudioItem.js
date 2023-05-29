const React = require('react');

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

    const handleProgressChange = () => {
        audioRef.current.currentTime = progressBarRef.current.value;
    };

    const formatTime = (time) => {
        if (time && !isNaN(time)) {
          const minutes = Math.floor(time / 60);
          const formatMinutes =
            minutes < 10 ? `0${minutes}` : `${minutes}`;
          const seconds = Math.floor(time % 60);
          const formatSeconds =
            seconds < 10 ? `0${seconds}` : `${seconds}`;
          return `${formatMinutes}:${formatSeconds}`;
        }
        return '00:00';
    };

    const onLoadedMetadata = () => {
        const seconds = audioRef.current.duration;
        setDuration(seconds);
        progressBarRef.current.max = seconds;
      };

    return <div>
			<div onClick={() => setIsSubmitted(false)} className='audio_back'></div>
            <div className='audio_player'>
                <div className="player_animation">

                </div>
                <div onClick={togglePlayPause} className="player_button">
                    <img src={isPlaying ? 'assets/pause.svg' : 'assets/play.svg'} alt="" />
                </div>
                <div className="player_progress">
                    <input type="range" ref={progressBarRef} defaultValue="0" onChange={handleProgressChange} />
                    <audio ref={audioRef} src={inputValue} onLoadedMetadata={onLoadedMetadata} />
                </div>
                <div className="player_bottom">
                    <div className="player_time">
                        <span className="time current">{formatTime(timeProgress)}</span>
                    </div>
                    <div className="player_sound">
                        <input type="range" min={0} max={100} value={volume} onChange={(e) => setVolume(e.target.value)} />
                    </div>
                </div>
            </div>
		</div>;
}

module.exports = AudioItem;