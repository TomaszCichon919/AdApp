import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import initialState from './InitialState';

// import reducers
import adsReducer from './adsRedux';
import userReducer from './usersRedux';

// combine reducers
const subreducers = {
  ads: adsReducer,
  user: userReducer,

}

const reducer = combineReducers(subreducers)
const store = createStore(
  reducer,
  initialState,
  compose(
		applyMiddleware(thunk),
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	)
);

export default store;
