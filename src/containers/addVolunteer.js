import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import $ from 'jquery'
import config from '../config'
import Form from '../components/form'
import metadata from '../configs/volunteer'
import Snackbar from 'material-ui/Snackbar'

require('../css/addVolunteer.css')

export default class AddVolunteer extends Component{
  constructor(){
    super()
    this.dataStructure = {
      name: '',
      fatherName: '',
      phoneNumber: '',
      voterId: '',
      email: '',
      lokSabha: '',
      vidhanSabha: '',
      pinCode: '',
      twitterId: '',
      facebookId: '',
      originParty: ''
    }
    this.voluneerMessage = "Volunteer invited successfully"
    this.state = {
      error: null,
      success: null,
      snackStatus: false
    }
  }

  handleRequestClose = () => {
    this.setState({
      snackStatus: false,
    });
  };
  
  submitData(data){
    data.phoneNumber = data.username
    $.ajax({
      url:`${config.apiBaseURL}/users/invite`
    , method : 'post'
    , data : JSON.stringify(data)
    , contentType : "application/json"
    , headers : {
      'Authorization' : 'Token '+config.getToken()
    }
    , dataType: 'json'
    , success : (response) => {
        this.setState({
          snackStatus: true,
          success: this.voluneerMessage
        });
        window.setTimeout(() => browserHistory.push('verifyVolunteers'), 3000)
      }
    , error: (err) => {
      console.log(err)
        this.setState({'error': err.responseJSON ? err.responseJSON.error: 'Some error occured'})
      }
    })
  }

  render(){
    const { error, success } = this.state
    return(
     <div className="add-volunteer-container">
        <h3>Add Volunteer</h3>
        <p>Pleasae add details of volunteer and submit</p>
        {error || success ? <div className={error ? 'error' : 'success'}>{error ? error : success}</div> : null }
        <Form 
          metadata = { metadata } 
          onSubmitData = { this.submitData.bind(this) } 
          dataFormat = { this.dataStructure } 
          cssClassName="add-volunteer-form" /> 
        <Snackbar
          open={this.state.snackStatus}
          message={this.voluneerMessage}
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    )
  }
}