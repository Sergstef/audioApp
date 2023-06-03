const React = require('react');

const PlayerButton = require('./PlayerButton/PlayerButton');
const PlayerProgress = require('./PlayerProgress/PlayerProgress');
const PlayerBottom = require('./PlayerBottom/PlayerBottom');

const speedArr = [0.5, 1, 1.5];

const PlayerItem = ({ inputValue, setIsSubmitted, isVideo }) => {
    const audioRef = React.useRef();
    const progressBarRef = React.useRef();
    const playAnimationRef = React.useRef();
    const displayRef = React.useRef();
    const [isPlaying, setIsPlaying] = React.useState(false);
    const [timeProgress, setTimeProgress] = React.useState(0);
    const [duration, setDuration] = React.useState(0);
    const [volume, setVolume] = React.useState(60);
    const [loading, setLoading] = React.useState(false);
    const [speedBlockOpened, setSpeedBlockOpened] = React.useState(false);
    const [selectedSpeed, setSelectedSpeed] = React.useState(speedArr[1]);

    React.useEffect(() => {
        displayRef.current.focus();
    }, []);

    React.useEffect(() => {
        audioRef.current.playbackRate = selectedSpeed;
    }, [selectedSpeed]);

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

    const getBack = () => {
        document.querySelector('.page_header').style.height = 'auto';
        document.querySelector('.header_text').style.marginBottom = '182px';
        setIsSubmitted(false);
    };

    const toggleSpeedBlock = () => {
        setSpeedBlockOpened((prev) => !prev);
    };

    React.useEffect(() => {
        console.log(volume)
    }, [volume])

    const handleKeyDown = event => {
        if (event.code === 'KeyQ') {
            togglePlayPause();
        }

        if (event.code === 'ArrowLeft') {
            audioRef.current.currentTime -= 2;
            progressBarRef.current.value -= 2;
        }

        if (event.code === 'ArrowRight') {
            audioRef.current.currentTime += 2;
            const progress = parseInt(progressBarRef.current.value) + 2;
            progressBarRef.current.value = progress;
        }

        if (event.code === 'ArrowUp') {
            event.preventDefault();

            if (volume + 3 > 100) {
                setVolume(100);
            } else {
                setVolume(prev => prev + 3);
            }
        }

        if (event.code === 'ArrowDown') {
            event.preventDefault()

            if (volume - 3 < 0) {
                setVolume(0);
            } else {
                setVolume(prev => prev - 3);
            }
        }
    };

    return <div>
        <div onClick={getBack} className='player_back'></div>
        {isVideo && <video ref={audioRef} src={inputValue} onLoadedMetadata={onLoadedMetadata} className='video_player'
             onWaiting={() => setLoading(true)} onPause={() => setLoading(false)} onPlaying={() => setLoading(false)} />}
        <div className='player_display'>
            <span className="player_loader" style={{ opacity: loading ? 1 : 0 }} />
            <div className='display_content'>
                <div className='display_main' tabIndex={0} onKeyDown={handleKeyDown} onBlur={() => displayRef.current.focus()} ref={displayRef}>
                    <PlayerButton togglePlayPause={togglePlayPause} isPlaying={isPlaying} />    
                    <PlayerProgress audioRef={audioRef} progressBarRef={progressBarRef} inputValue={inputValue} isVideo={isVideo}
                        onLoadedMetadata={onLoadedMetadata} setLoading={setLoading} />
                    <PlayerBottom timeProgress={timeProgress} volume={volume} setVolume={setVolume} />
                </div>
                <div className='display_extra'>
                    <div className='extra_dots' onClick={toggleSpeedBlock}>
                        {speedBlockOpened && <div className='extra_speed'>
                            {speedArr.map((el, i) => <div key={i} style={{ color: selectedSpeed === el ? 'black' : '#A4A3A4' }}
                                 className='speed_item' onClick={() => setSelectedSpeed(el)}>
                                    <span>{el}</span>
                            </div>)}
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    </div>;
}

module.exports = PlayerItem;