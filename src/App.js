import { useEffect, useReducer } from 'react';
import Header from './components/Header';
import Main from './components/Main';
import Loader from './components/Loader';
import Error from './components/Error';
import StartScreen from './components/StartScreen';
import Question from './components/Question';
import NextBtn from './components/NextBtn';
import Progress from './components/Progress';
import FinishScreen from './components/FinishScreen';
import Footer from './components/Footer';
import Timer from './components/Timer';

const SECS_PER_QUESTION = 30;

const initialState = {
	questions: [],

	// loading, error, ready, active, finished
	status: 'loading',
	index: 0,
	answers: [],
	answer: null,
	points: 0,
	highscore: 0,
	secondsLeft: null,
};

const reducer = (state, action) => {
	switch (action.type) {
		case 'dataRecived':
			return { ...state, questions: action.payload, status: 'ready' };
		case 'dataFailed':
			return { ...state, status: 'error' };
		case 'start':
			return {
				...state,
				status: 'active',
				secondsLeft: state.questions.length * SECS_PER_QUESTION,
			};
		case 'newAnswer':
			const currentQuestion = state.questions.at(state.index);

			return {
				...state,
				answer: action.payload,
				answers: [
					...state.answers,
					{ ...currentQuestion, answer: action.payload },
				],
				points:
					action.payload === currentQuestion.correctOption
						? state.points + currentQuestion.points
						: state.points,
			};
		case 'nextQuestion':
			return { ...state, index: state.index + 1, answer: null };
		case 'finish':
			return {
				...state,
				status: 'finished',
				highscore:
					state.points > state.highscore ? state.points : state.highscore,
			};
		case 'restart':
			return { ...initialState, status: 'ready', questions: state.questions };
		case 'tick':
			return {
				...state,
				secondsLeft: state.secondsLeft - 1,
				status: state.secondsLeft === 0 ? 'finished' : state.status,
			};
		default:
			throw new Error('Unknown action');
	}
};

function App() {
	const [
		{
			questions,
			status,
			index,
			answers,
			answer,
			points,
			highscore,
			secondsLeft,
		},
		dispatch,
	] = useReducer(reducer, initialState);

	const maxPossiblePoints = questions.reduce(
		(acc, question) => acc + question.points,
		0
	);

	useEffect(() => {
		const fetchQuestions = async () => {
			try {
				const res = await fetch(
					'https://quidditch-server.vercel.app/questions'
				);
				const data = await res.json();

				// save data in state
				dispatch({ type: 'dataRecived', payload: data });
			} catch (error) {
				// save data in state
				dispatch({ type: 'dataFailed' });
			}
		};

		fetchQuestions();
	}, []);
	return (
		<div className='app'>
			<Header />
			<Main>
				{status === 'loading' && <Loader />}
				{status === 'error' && <Error />}
				{status === 'ready' && (
					<StartScreen numQuestions={questions.length} dispatch={dispatch} />
				)}
				{status === 'active' && (
					<>
						<Progress
							index={index}
							numQuestions={questions.length}
							points={points}
							maxPossiblePoints={maxPossiblePoints}
							answer={answer}
						/>
						<Question
							question={questions[index]}
							dispatch={dispatch}
							answer={answer}
						/>
						<Footer>
							<Timer dispatch={dispatch} secondsLeft={secondsLeft} />
							{answer !== null && (
								<NextBtn
									dispatch={dispatch}
									index={index}
									numQuestions={questions.length}
								/>
							)}
						</Footer>
					</>
				)}
				{status === 'finished' && (
					<FinishScreen
						points={points}
						maxPossiblePoints={maxPossiblePoints}
						highscore={highscore}
						dispatch={dispatch}
						answers={answers}
						numQuestions={questions.length}
					/>
				)}
			</Main>
		</div>
	);
}

export default App;
