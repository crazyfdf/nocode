import { createStore } from 'redux';

const ADD = 'add';

const defaultState = {
	counter: 28,
	currentWindow: null,
};

function reducer(preState, action) {
	switch (action.type) {
		case ADD:
			return {
				...preState,
				counter: preState.counter + 1,
			};
		default:
			return preState;
	}
}

function createMyStore(initialState = defaultState) {
	const MyStore = createStore(reducer, initialState);
	return MyStore;
}

export default createMyStore;
