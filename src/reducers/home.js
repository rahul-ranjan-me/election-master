export default function home(state = getInitialState(null), action) {
  switch (action.type) {
    case 'LOGOUT':
      return getInitialState();
    default:
      return state;
    case 'PROFILE_GET':
      return {
        ...state,
        isFetching: true
      };
  }
}

function getInitialState() {
  return {
    isFetching: false,
    profile: null
  };
}