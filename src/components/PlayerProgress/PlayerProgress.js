const React = require('react');

const PlayerProgress = ({ audioRef, progressBarRef, inputValue, isVideo, onLoadedMetadata, setLoading }) => {
    const handleProgressChange = () => {
        audioRef.current.currentTime = progressBarRef.current.value;
    };
    console.log(audioRef)
    return <div className="player_progress">
        <input type="range" ref={progressBarRef} defaultValue="0" onChange={handleProgressChange} />
        {!isVideo && <audio ref={audioRef} src={inputValue}
            onLoadedMetadata={onLoadedMetadata} onWaiting={() => setLoading(true)} onPause={() => setLoading(false)} onPlaying={() => setLoading(false)} />}
    </div>;
}

module.exports = PlayerProgress;