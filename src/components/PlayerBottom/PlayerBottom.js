const React = require('react');

const PlayerBottom = ({ timeProgress, volume, setVolume }) => {

    const formatTime = (time) => {
        if (time && !isNaN(time)) {
          const minutes = Math.floor(time / 60);
          const formatMinutes = minutes < 10 ? `0${minutes}` : `${minutes}`;
          const seconds = Math.floor(time % 60);
          const formatSeconds = seconds < 10 ? `0${seconds}` : `${seconds}`;

          return `${formatMinutes}:${formatSeconds}`;
        }

        return '00:00';
    };
    
    return <div className="player_bottom">
        <div className="player_time">
            <span className="time_current">{formatTime(timeProgress)}</span>
        </div>
        <div className="player_sound">
            <input type="range" min={0} max={100} value={volume} onChange={(e) => setVolume(e.target.value)} />
        </div>
    </div>;
}

module.exports = PlayerBottom;