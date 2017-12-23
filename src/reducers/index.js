import { combineReducers } from 'redux'
import inviteListReducer from './inviteList'
import homeListReducer from './home';
import loginListReducer from './login'
import userReducer from './user'
// import registerReducer from './register'

const allReducers = combineReducers({
	inviteList: inviteListReducer
, homeListReducer : homeListReducer
, loginListReducer : loginListReducer
, userDetails : userReducer
});

export default allReducers;