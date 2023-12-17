import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import initialState from './InitialState';

// import reducers
import ads from './adsRedux';
import seats from './seatsRedux';
import userReducer from './usersRedux';

// combine reducers
const rootReducer = combineReducers({
  ads,
  seats,
  user: userReducer,

});

const store = createStore(
  rootReducer,
  initialState,
  compose(
		applyMiddleware(thunk),
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	)
);

export default store;
