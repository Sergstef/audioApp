const React = require('react');

const PlayerForm = require('./PlayerForm');
const PlayerItem = require('./PlayerItem');

const App = () => {
	const [inputValue, setInputValue] = React.useState('');
	const [isSubmitted, setIsSubmitted] = React.useState(false);
	const [isError, setIsError] = React.useState(false);
	const [isVideo, setIsVideo] = React.useState(false);
	const [isWarningOpened, setIsWarningOpened] = React.useState(false);

	React.useEffect(() => {
		if (!isSubmitted) {
			setIsVideo(false);
			setIsError(false);
			setInputValue('');
		}
	}, [isSubmitted]);

	const checkIsVideo = () => {
		const reg = new RegExp(/\.(?:webm|mp4)$/i);
        if (inputValue.match(reg)) {
			document.querySelector('.page_header').style.height = '678px';
			document.querySelector('.header_text').style.marginBottom = 'auto';
			setIsVideo(true);
		}
	};

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
			setIsWarningOpened(true);
			setIsError(true);
		}
	};

    return <div>
		{isWarningOpened && <div className='warning'>
			<div className='warning_content'>
				<div className='warning_icon'></div>
				<div className='warning_text'>
					<div className='warning_title'>Warning</div>
					<div className='warning_desc'>Invalid link. Please start link with 'https://'</div>
				</div>
			</div>
			<div onClick={() => setIsWarningOpened(false)} className='warning_close'></div>
		</div>}
		<div className="container_block page_header">
			<div className="header_title title">
				Play any audio sources directly in the browser!
			</div>
			<div className="header_player" style={{ top: isVideo ? 40 : 171 }}>
				{!isSubmitted && <PlayerForm inputValue={inputValue} setInputValue={setInputValue} onSubmit={onSubmit}
					isError={isError} setIsError={setIsError} />}
				{isSubmitted && <PlayerItem inputValue={inputValue} setIsSubmitted={setIsSubmitted} isVideo={isVideo} />}
			</div>
			<div className="header_text text">
				Without any restrictions for free
			</div>
			<div className="header-info">
				By uploading the audio file, you agree to our
				<span className="header-info_terms">Terms of Service.</span>
			</div>
		</div>
	</div>;
}

module.exports = App;