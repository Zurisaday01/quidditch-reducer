import React from 'react';

function Progress({ index, numQuestions, points, maxPossiblePoints, answer }) {
	return (
		<header className='progress'>
			<progress
				className='bar'
				max={numQuestions}
				value={index + Number(answer !== null)}
			/>
			{/* if the user has answered add 1 otherwise 0 */}
			<p>
				Question {index + 1} / {numQuestions}
			</p>
			<p>
				{points} / {maxPossiblePoints}
			</p>
		</header>
	);
}

export default Progress;
