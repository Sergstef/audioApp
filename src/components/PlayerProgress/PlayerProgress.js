const React = require('react');

const PlayerProgress = ({ audioRef, progressBarRef, inputValue, isVideo, onLoadedMetadata }) => {
    const handleProgressChange = () => {
        audioRef.current.currentTime = progressBarRef.current.value;
    };
    
    return <div className="player_progress">
        <input type="range" ref={progressBarRef} defaultValue="0" onChange={handleProgressChange} />
        {!isVideo && <audio ref={audioRef} src={inputValue} onLoadedMetadata={onLoadedMetadata} />}
    </div>;
}

module.exports = PlayerProgress;