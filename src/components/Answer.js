import React from 'react';

function Answer({ answer }) {
	return (
		<>
			<div className='heading-result'>
				<h3>
					{answer.answer === answer.correctOption ? 'Correct ✔️' : 'Wrong ❌'}
				</h3>
				<span>{answer.points} points</span>
			</div>

			<h4>{answer.question}</h4>
			<div className='options'>
				{answer.options.map((option, index) => (
					<div
						key={option}
						className={`btn btn-option u-remove-hover-btn ${
							index === answer.answer ? 'answer' : ''
						} ${index === answer.correctOption ? 'correct' : 'wrong'} `}>
						{option}
					</div>
				))}
			</div>
		</>
	);
}

export default Answer;
