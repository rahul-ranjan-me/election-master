import React, { Component } from 'react'
import { Grid } from 'react-bootstrap'
import $ from 'jquery'
import Table from '../components/grid'
import headers from '../configs/verifyVolunteersGrid'
import candidateList from '../jsons/verifyVolunteers'
import config from '../config'
require('../css/verifyVolunteers.css')

export default class VerifyVolunteers extends Component{
  constructor(){
    super()
    this.state = {
      candidateList : []
    }
  }

  componentDidMount(){
    $.ajax({
      url:`${config.apiBaseURL}/users/invite?userActive=false`
    , method : 'get'
    , contentType : "application/json"
    , headers : {
      'Authorization' : 'Token '+config.getToken()
    }
    , dataType: 'json'
    , success : (response) => {
        response.map((data) => {
          delete data.avatar
          data.reinvite = 'Reinvite'
        })
        this.setState({
          candidateList : response
        })
      }
    , error: (err) => {
        this.setState({'error': err.responseJSON ? err.responseJSON.error: 'Some error occured'})
      }
    })
  }

  onSelected(selectedRow){
    console.log(selectedRow)
  }

  render(){
    return(
      <Grid>
        <h3>Verify Volunteers</h3>
        <p>Pleasae select a volunteer to verify or re-invite</p>
        <Table 
          headers = {headers}
          rows = {this.state.candidateList}
          collapsible = {false}
          cssStyle = {{width: "100%"}}
          onSelected = {this.onSelected}/>
      </Grid>
    )
  }
}