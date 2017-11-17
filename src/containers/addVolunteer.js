import React, { Component } from 'react'
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
      mobile: '',
      voterId: '',
      email: '',
      lokSabha: '',
      vidhanSabha: '',
      pinCode: '',
      twitterId: '',
      facebookId: ''
    }
  }
  
  submitData(data){
    console.log(data)
  }

  render(){
    return(
     <Grid>
        <h3>Add Volunteer</h3>
        <p>Pleasae add details of volunteer and submit</p>
        <Form 
          metadata = { metadata } 
          onSubmitData = { this.submitData.bind(this) } 
          dataFormat = { this.dataStructure } 
          cssClassName="add-volunteer-form" /> 
      </Grid>
    )
  }
}