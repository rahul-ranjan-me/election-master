import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import Form from '../components/form'
import metadata from '../configs/volunteer'
import config from '../config'
import $ from 'jquery'
import { addVolunteer } from '../actions/Login';
import {bindActionCreators} from 'redux';
import _ from 'lodash';
import {connect} from 'react-redux';

require('../css/signup.css')

class AddVolunteer extends Component{
  constructor(){
    super()

    this.metadata = metadata.slice();
    this.metadata.push( 
      {
        'id' : 'password',
        'label' : 'Password',
        'type' : 'password',
        'value': ''
      },
      {
        'id' : 'repeatPassword',
        'label' : 'Repeat Password',
        'type' : 'password',
        'value': ''
      }
    )
    this.dataStructure = {
      name: '',
      fatherName: '',
      username: '',
      voterId: '',
      email: '',
      lokSabha: '',
      vidhanSabha: '',
      pinCode: '',
      address: '',
      twitterId: '',
      facebookId: '',
      password: '',
      repeatPassword: '',
      originParty: ''
    }

    this.state = {
      error: null
    }
  }
  
  submitData(data){
    $.ajax({
      url:`${config.apiBaseURL}/users/register`
    , method : 'post'
    , data : JSON.stringify(this.dataStructure)
    , contentType : "application/json"
    , dataType: 'json'
    , success : (response) => {
        browserHistory.push('home')
      }
    , error: (err) => {
        this.setState({'error': err.responseJSON ? err.responseJSON.error: 'Some error occured'})
      }
    })
  }

  render(){
    const { error } = this.state
    return(
       <div className="login-container-outer signup-container">
        <div className="login-container-block">
          <div className="login-container">
            <h2><span>Election</span> Master</h2>
            <div className="login-block">
              <h3>Sign up</h3>
              <p>Please add details to signup</p>
              {error ? <div className="error">{error}</div> : null }
              <div className="signup-scroll">
                <Form 
                  metadata = { this.metadata } 
                  onSubmitData = { this.submitData.bind(this) } 
                  dataFormat = { this.dataStructure } 
                  cssClassName="signup-form signup-scroll" /> 
              </div>
            </div>
            <div className="signup">
              <p>Go to <Link to="login">Login</Link></p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    addVolunteer : addVolunteer
  }, dispatch);
}

function mapStateToProps(state) {
  return {token : state.loginListReducer.token}
}

export default connect(mapStateToProps, mapDispatchToProps)(AddVolunteer);