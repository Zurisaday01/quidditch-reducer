import React from 'react';
import Results from './Results';

function FinishScreen({
	points,
	maxPossiblePoints,
	highscore,
	dispatch,
	answers,
	numQuestions,
}) {
	const percentage = (points / maxPossiblePoints) * 100;

	let emoji;
	if (percentage === 100) emoji = '🎉';
	if (percentage >= 80 && percentage < 100) emoji = '😎';
	if (percentage >= 50 && percentage < 80) emoji = '🙃';
	if (percentage >= 0 && percentage < 50) emoji = '🧐';
	if (percentage === 0) emoji = '🥺';

	return (
		<>
			<p className='result'>
				{emoji} You scored {points} out of {maxPossiblePoints} (
				{Math.ceil(percentage)}%)
			</p>
			<p className='highscore'>Highscore: {highscore} points</p>
			<button
				className='btn btn-ui'
				onClick={() => dispatch({ type: 'restart' })}>
				Restart quiz
			</button>
			<div className='u-mt-medium'>
				<Results answers={answers} numQuestions={numQuestions} />
			</div>
		</>
	);
}

export default FinishScreen;
