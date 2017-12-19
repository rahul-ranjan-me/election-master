const config = {
  apiBaseURL : 'https://election-master-service.herokuapp.com/api/v0/' //'http://localhost:4000/api/v0/' //'https://election-master-service.herokuapp.com/api/v0/'
, setToken : (token) => {
    if (token) {
      window.localStorage.setItem('token', token);
    } else {
      window.localStorage.removeItem('token');
    }
  }
, getToken : () => {
    return window.localStorage.getItem('token');
  }
}

export default config