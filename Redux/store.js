import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { reducerFunc } from "./reducer";
import bluetoothReducer from "./bluetoothReducer";
import locationReducer from "./locationReducer";

let AllReducer = combineReducers({
  bluetooth: bluetoothReducer,
  normal: reducerFunc,
  location: locationReducer,
});

const store = createStore(AllReducer, applyMiddleware(thunk));

export { store };
