const React = require('react');

const PlayerProgress = ({ audioRef, progressBarRef, setDuration, inputValue }) => {
    const handleProgressChange = () => {
        audioRef.current.currentTime = progressBarRef.current.value;
    };

    const onLoadedMetadata = () => {
        const seconds = audioRef.current.duration;
        setDuration(seconds);
        progressBarRef.current.max = seconds;
      };
    
    return <div className="player_progress">
        <input type="range" ref={progressBarRef} defaultValue="0" onChange={handleProgressChange} />
        <audio ref={audioRef} src={inputValue} onLoadedMetadata={onLoadedMetadata} />
    </div>;
}

module.exports = PlayerProgress;