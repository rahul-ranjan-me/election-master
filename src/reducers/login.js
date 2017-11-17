import config from '../config';

export default function login(state = getInitialState(null), action) {
  switch (action.type) {
    case 'USER_LOGOUT':
      return getInitialState();
    default:
      return state;
    case 'USER_LOGIN':
      return {
        ...state,
        isFetching: true,
        token: action.payload
      };
    case 'ADD_VOLUNTEER':
      return {

      }
  }
}

function getInitialState() {
  return {
    isFetching: false,
    token: config.getToken()
  };
}