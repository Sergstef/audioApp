const React = require('react');

const PlayerForm = ({ inputValue, setInputValue, onSubmit, isError }) => {
    return <div>
			<div className='audio_title'>
                Insert the link
            </div>
            <div className='audio_form'>
                <input value={inputValue} onChange={e => setInputValue(e.target.value)} type="text"
                     className={isError ? 'audio_input-error' : 'audio_input'} placeholder='https://'>
                             
                </input> 
                <button onClick={onSubmit} className='audio_submit' />
            </div>
            {isError && <div className='error_msg'>Invalid link. Please start link with 'https://'</div>}
		</div>;
}

module.exports = PlayerForm;