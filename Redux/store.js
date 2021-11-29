import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import { reducerFunc } from './reducer';
import bluetoothReducer from './bluetoothReducer';
import locationReducer from './locationReducer';
import kycReducer from './kycReducer';

let AllReducer = combineReducers({
	bluetooth: bluetoothReducer,
	normal: reducerFunc,
	location: locationReducer,
	kyc: kycReducer,
});

const store = createStore(
	AllReducer,
	composeWithDevTools(applyMiddleware(thunk))
);

export { store };
