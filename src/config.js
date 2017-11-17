const config = {
  apiBaseURL : 'http://localhost:4000/api/v0/'
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