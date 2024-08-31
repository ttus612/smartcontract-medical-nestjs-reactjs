import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from 'redux-thunk';

import { provider, medical } from "./reducer";
import { composeWithDevTools } from "redux-devtools-extension";
const reducer = combineReducers({provider, medical});
const initialState = {};
const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
