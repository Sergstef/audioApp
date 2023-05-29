const React = require('react');

const AudioForm = require('./AudioForm');
const AudioItem = require('./AudioItem');

const App = () => {
	let [inputValue, setInputValue] = React.useState('');
	let [isSubmitted, setIsSubmitted] = React.useState(false);

	const onSubmit = () => {
		const reg = new RegExp(/\.(?:wav|mp3)$/i);

		if (inputValue.match(reg)) {
			setIsSubmitted(true);
		}
	}

    return <div>
			{!isSubmitted && <AudioForm inputValue={inputValue} setInputValue={setInputValue} onSubmit={onSubmit} />}
			{isSubmitted && <AudioItem inputValue={inputValue} setIsSubmitted={setIsSubmitted} />}
			{/* <AudioItem inputValue={'https://ts01.flac.pw/mp3/13085.mp3'} setIsSubmitted={setIsSubmitted} /> */}
		</div>;
}

module.exports = App;