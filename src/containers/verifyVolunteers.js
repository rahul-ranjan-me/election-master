import React, { Component } from 'react'
import { Grid } from 'react-bootstrap'
import Table from '../components/grid'
import headers from '../configs/verifyVolunteersGrid'
import candidateList from '../jsons/verifyVolunteers'
require('../css/verifyVolunteers.css')

export default class VerifyVolunteers extends Component{
  constructor(){
    super()

    this.state = {
      candidateList : candidateList
    }
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