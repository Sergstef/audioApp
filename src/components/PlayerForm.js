const React = require('react');

const PlayerForm = ({ inputValue, setInputValue, onSubmit, isError }) => {
    const [isHistory, setIsHistory] = React.useState(false);

    const getIsHistory = () => setIsHistory(!isError && localStorage.history);

    return <div>
			<div className='player_title'>
                Insert the link
            </div>
            <div className='player_form'>
                <input onFocus={getIsHistory} onBlur={() => setIsHistory(false)} 
                     value={inputValue} onChange={e => setInputValue(e.target.value)} type="text" id="player_input"
                     className={isError ? 'player_input-error' : 'player_input'} placeholder='https://'>
                             
                </input> 
                <button onClick={onSubmit} className='player_submit' />
                {isHistory && <div className='player_history'>
                        {JSON.parse(localStorage.history).map((el, i) => <div className='history_item'
                            key={i} title={el}>{el}
                         </div>)}
                </div>}
            </div>
            {isError && <div className='error_msg'>Invalid link. Please start link with 'https://'</div>}
		</div>;
}

module.exports = PlayerForm;