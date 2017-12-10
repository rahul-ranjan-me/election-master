import React, { Component } from 'react'
import $ from 'jquery'
import config from '../config'
import { Grid } from 'react-bootstrap'
import Form from '../components/form'
import metadata from '../configs/volunteer'

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
      facebookId: ''
    }
    this.state = {
      error: null,
      success: null
    }
  }
  
  submitData(data){
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
        this.setState({'success': response.name+' is invited'})
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
     <Grid>
        <h3>Add Volunteer</h3>
        <p>Pleasae add details of volunteer and submit</p>
        {error || success ? <div className={error ? 'error' : 'success'}>{error ? error : success}</div> : null }
        <Form 
          metadata = { metadata } 
          onSubmitData = { this.submitData.bind(this) } 
          dataFormat = { this.dataStructure } 
          cssClassName="add-volunteer-form" /> 
      </Grid>
    )
  }
}