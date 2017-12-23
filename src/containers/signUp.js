import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import Form from '../components/form'
import metadata from '../configs/volunteer'
import config from '../config'
import { signup, userDetailsSignup, userVerify } from '../promises'
import { addVolunteer } from '../actions/Login';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import { connect } from 'react-redux';

require('../css/signup.css')

class AddVolunteer extends Component{
  constructor(){
    super()

    this.metadata = metadata.slice()
    this.userData = {}
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

    this.metadataVerify = [
      {
        'id' : 'loginOTP',
        'label' : 'Enter OTP',
        'type' : 'password',
        'value': ''
      }
    ]

    this.dataStructureVerify = {
      loginOTP: null
    }

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
      metadata: this.metadata
    , error: null
    }
  }

  componentDidMount(){
    const id = this.props.params.id

    if(id !== 'new'){
      userDetailsSignup(id).then((res) => {
        this.state.metadata.forEach((node) => {
          node.value = res.data[node.id]
        })
        this.setState({metadata: this.state.metadata})
      })
      .catch((err) => {
        this.setState({'error': 'Invalid id passed. Please check the URL'})
      })
    }
  }
  
  submitData(data){
    signup(this.dataStructure)
      .then((response) => {
        this.userData = response.data
        this.setState({
          verifyUser: true
        })
      })
      .catch((err) => {
        const errorJSON = JSON.parse(JSON.stringify(err))
        this.setState({'error': errorJSON.response.data.error ? errorJSON.response.data.error : 'Some error occured'})
      })
  }

  submitDataVerify(data){
    this.dataStructureVerify.loginOTP = parseInt(this.dataStructureVerify.loginOTP)
    userVerify(this.dataStructureVerify, this.userData.api_key)
      .then((response) => browserHistory.push('home'))
      .catch((err) => {
        const errorJSON = JSON.parse(JSON.stringify(err))
        this.setState({'error':errorJSON.response.data.message})
      })
  }

  render(){
    const { error, metadata } = this.state

    return(
       <div className="login-container-outer signup-container">
        <div className="login-container-block">
          <div className="login-container">
            <h2><span>Election</span> Master</h2>
            <div className="login-block">
              { this.state.verifyUser ?
                <div>
                  <h3>Verify User</h3>
                  {error ? <div className="error">{error}</div> : null }
                  <div className="signup-scroll">
                    <Form 
                      metadata = { this.metadataVerify } 
                      onSubmitData = { this.submitDataVerify.bind(this) } 
                      dataFormat = { this.dataStructureVerify } 
                      cssClassName="signup-form signup-scroll" /> 
                  </div>
                </div>
                : <div> 
                  <h3>Sign up</h3>
                  <p>Please add details to signup</p>
                  {error ? <div className="error">{error}</div> : null }
                  <div className="signup-scroll">
                    <Form 
                      metadata = { metadata } 
                      onSubmitData = { this.submitData.bind(this) } 
                      dataFormat = { this.dataStructure } 
                      cssClassName="signup-form signup-scroll" /> 
                  </div>
                </div>}
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