import React, { useEffect } from 'react';

function Timer({ dispatch, secondsLeft }) {
	const min = Math.floor(secondsLeft / 60);
	const secs = secondsLeft % 60;
	useEffect(() => {
		const intervalId = setInterval(() => dispatch({ type: 'tick' }), 1000);

		return () => clearInterval(intervalId);
	});
	return (
		<div className='timer'>
			{min < 10 && '0'}
			{min}:{secs < 10 && '0'}
			{secs}
		</div>
	);
}

export default Timer;
