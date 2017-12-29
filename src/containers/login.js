import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import $ from 'jquery'
import config from '../config'
import Form from '../components/form'
import { login as loginPromise } from '../promises'
import { login, logout } from '../actions/Login'
import {bindActionCreators} from 'redux'
import _ from 'lodash'
import { connect } from 'react-redux'

require('../css/login.css')

class Login extends Component{
  constructor(){
    super()

    this.metadata = [
      {
        'id' : 'username',
        'label' : 'Username',
        'type' : 'text',
        'value': ''
      },
      {
        'id' : 'password',
        'label' : 'Password',
        'type' : 'password',
        'value': ''
      }
    ] 
    this.dataStructure = {
      username: '',
      password: ''
    }
    this.state = {
      error: null
    }
    this.redirectIfAuthed = this.redirectIfAuthed.bind(this);
  }

  componentDidMount() {
    this.redirectIfAuthed(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.redirectIfAuthed(nextProps);
  }

  redirectIfAuthed(props) {
    var {location, token} = props;
    if (token) {
      if (location.query.redirectTo) {
        browserHistory.push(location.query.redirectTo);
      } else {
        browserHistory.push('/');
      }
    }
  }
  
  submitData(data){
    loginPromise(data)
      .then((response) => {
        const { token } = response.data
        config.setToken(token);
        this.props.login(token)
        this.setState({
          auth: token
        })
        browserHistory.push('home')
      })
      .catch((err) => {
        const errorJSON = JSON.parse(JSON.stringify(err))
        this.setState({'error': errorJSON.response.data && errorJSON.response.data.error ? errorJSON.response.data.error : 'Some error occured'})
      })
  }

  render(){
    const { error } = this.state
    return(
      <div className="login-container-outer">
        <div className="login-container-block">
          <div className="login-container">
            <h2><span>Election</span> Master</h2>
            <div className="login-block">
              <h3>Login</h3>
              {error ? <div className="error">{error}</div> : null }
              <Form 
                metadata = { this.metadata } 
                onSubmitData = { this.submitData.bind(this) } 
                dataFormat = { this.dataStructure } 
                cssClassName="login-form" /> 
            </div>
            <div className="signup">
              <p>New to the system? Click here to <Link to="/signup/new">Signup</Link></p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    loginPromise: loginPromise
  , login : login
  , logout : logout
  }, dispatch);
}

function mapStateToProps(state) {
  return {token : state.loginListReducer.token}
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);