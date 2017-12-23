import { userDetails } from '../promises'

const getUserDetails = function() {
  return(dispatch) => {
    return userDetails().then((response) => {
      dispatch({type: 'GET_USER_DETAILS', payload: response.data})
    }).catch(error => {
      throw(error);
    });
  }
}

export {
  getUserDetails
}