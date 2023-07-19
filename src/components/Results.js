import React from 'react';
import Answer from './Answer';

function Results({ answers, numQuestions }) {
	return (
		<div className='results'>
			<h2>Your results</h2>
			<div className='options'>
				{answers.map(answer => (
					<div key={answer}>
						<Answer answer={answer} />
					</div>
				))}
				{numQuestions !== answers.length && (
					<p>
						Above you only have the questions you answer, there were some that
						you did not answer
					</p>
				)}
			</div>
		</div>
	);
}

export default Results;
