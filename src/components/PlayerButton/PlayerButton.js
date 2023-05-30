const React = require('react');

const PlayerButton = ({ togglePlayPause, isPlaying }) => <div className="player_button">
    <img onClick={togglePlayPause} src={isPlaying ? 'assets/pause.svg' : 'assets/play.svg'} alt="" />
</div>

module.exports = PlayerButton;