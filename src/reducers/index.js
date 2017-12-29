import { combineReducers } from 'redux'
import inviteListReducer from './inviteList'
import homeListReducer from './home';
import loginListReducer from './login'
import userReducer from './user'
import eventsList from './eventsList'
import searchedUser from './search'
// import registerReducer from './register'

const allReducers = combineReducers({
	inviteList: inviteListReducer
, homeListReducer : homeListReducer
, loginListReducer : loginListReducer
, userDetails : userReducer
, eventsList: eventsList
, searchedUser: searchedUser
});

export default allReducers;