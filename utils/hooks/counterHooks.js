import { useState, useEffect } from 'react';

let useCounter = (sec) => {
	const [counter, setCounter] = useState(sec || 45);

	let reducedCounter = () => {
		setCounter((prev) => prev - 1);
	};

	let startCounter = () => {
		setCounter(sec || 45);
	};

	useEffect(() => {
		// Don't schedule if no delay is specified.
		if (counter === 0) {
			return;
		}

		const id = setTimeout(() => reducedCounter(), 1000);

		return () => clearTimeout(id);
	}, [counter]);

	return [counter, startCounter];
};

export default useCounter;
