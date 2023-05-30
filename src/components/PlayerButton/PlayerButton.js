const React = require('react');

const PlayerButton = ({ togglePlayPause, isPlaying }) => <div onClick={togglePlayPause} className="player_button">
    <img src={isPlaying ? 'assets/pause.svg' : 'assets/play.svg'} alt="" />
</div>

module.exports = PlayerButton;