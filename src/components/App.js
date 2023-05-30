const React = require('react');

const PlayerForm = require('./PlayerForm');
const PlayerItem = require('./PlayerItem');

const App = () => {
	const [inputValue, setInputValue] = React.useState('');
	const [isSubmitted, setIsSubmitted] = React.useState(false);
	const [isError, setIsError] = React.useState(false);
	const [isVideo, setIsVideo] = React.useState(false);

	React.useEffect(() => {
		if (!isSubmitted) {
			setIsVideo(false);
			setIsError(false);
			setInputValue('');
		}
	}, [isSubmitted])

	const checkIsVideo = () => {
		const reg = new RegExp(/\.(?:webm|mp4)$/i);
        if (inputValue.match(reg)) {
			document.querySelector('.page_header').style.height = '678px';
			document.querySelector('.header_text').style.marginBottom = 'auto';
			setIsVideo(true);
		}
	}

	const onSubmit = () => {
		if (inputValue.startsWith('https://')) {
			checkIsVideo();
			setIsSubmitted(true);
			setIsError(false);

			if (localStorage.history) {
				const history = JSON.parse(localStorage.history);
				history.push(inputValue);
				localStorage.history = JSON.stringify(history);
			} else {
				localStorage.history = JSON.stringify([inputValue]);
			}
		} else {
			setIsError(true);
		}
	}

    return <div className="header_player" style={{ top: isVideo ? 40 : 171 }}>
			{!isSubmitted && <PlayerForm inputValue={inputValue} setInputValue={setInputValue} onSubmit={onSubmit}
				 isError={isError} setIsError={setIsError} />}
			{isSubmitted && <PlayerItem inputValue={inputValue} setIsSubmitted={setIsSubmitted} isVideo={isVideo} />}
			{/* <AudioItem inputValue={'https://ts01.flac.pw/mp3/13085.mp3'} setIsSubmitted={setIsSubmitted} /> */}
		</div>;
}

module.exports = App;