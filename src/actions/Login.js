export function login(token) {
  return {type: 'USER_LOGIN', payload: token};
}

export function logout() {
  return {type: 'USER_LOGOUT', payload: {}};
}

export function addVolunteer() {
  return {type: 'ADD_VOLUNTEER', payload: {}};
}