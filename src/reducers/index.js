import { combineReducers } from 'redux';
import inviteListReducer from './inviteList';
import homeListReducer from './home';
import loginListReducer from './login';
// import registerReducer from './register';

const allReducers = combineReducers({
	inviteList: inviteListReducer,
	homeListReducer : homeListReducer,
	loginListReducer : loginListReducer
});

export default allReducers;