import { useState, useReducer } from 'react';
// useReducer is use when you have complex state, so
// initial State is usually an object

const initialState = { count: 0, step: 1 };

// state: current state, action: pass through dispatch
function reducer(state, action) {
	switch (action.type) {
		case 'decrease':
			return { ...state, count: state.count - state.step };
		case 'increase':
			return { ...state, count: state.count + state.step };
		case 'setCount':
			return { ...state, count: action.payload };
		case 'setStep':
			return { ...state, step: action.payload };
		case 'reset':
			return initialState;

		default:
			throw new Error('Unknown action');
	}
}

function DateCounter() {
	// const [step, setStep] = useState(1);

	// const [count, setCount] = useState(0);
	// state updating function, dispatch to update the state
	// previus state, current state

	const [{ count, step }, dispatch] = useReducer(reducer, initialState);

	// This mutates the date object.
	const date = new Date('june 21 2027');
	date.setDate(date.getDate() + count);

	const decrease = function () {
		// dispaching an action
		// setCount(count => count - step);
		dispatch({ type: 'decrease' });
	};

	const increase = function () {
		// setCount(count => count + step);
		dispatch({ type: 'increase' });
	};

	const defineCount = function (e) {
		dispatch({ type: 'setCount', payload: Number(e.target.value) });
	};

	const defineStep = function (e) {
		dispatch({ type: 'setStep', payload: Number(e.target.value) });
	};

	const reset = function () {
		dispatch({ type: 'reset' });
	};

	return (
		<div className='counter'>
			<div>
				<input
					type='range'
					min='0'
					max='10'
					value={step}
					onChange={defineStep}
				/>
				<span>{step}</span>
			</div>

			<div>
				<button onClick={decrease}>-</button>
				<input value={count} onChange={defineCount} />
				<button onClick={increase}>+</button>
			</div>

			<p>{date.toDateString()}</p>

			<div>
				<button onClick={reset}>Reset</button>
			</div>
		</div>
	);
}
export default DateCounter;
