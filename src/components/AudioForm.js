const React = require('react');

const AudioForm = ({ inputValue, setInputValue, onSubmit }) => {
    return <div>
			<div className='audio_title'>
                Insert the link
            </div>
            <div className='audioForm'>
                <input value={inputValue} onChange={e => setInputValue(e.target.value)} type="text" className='audio_input' placeholder='https://'/>
                <button onClick={onSubmit} className='audio_submit' />
            </div>
		</div>;
}

module.exports = AudioForm;