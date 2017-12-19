import React, { Component } from 'react'
import { Grid } from 'react-bootstrap'
import AuthenticatedPage from '../containers/AuthenticatedPage';
import Table from '../components/grid'
import headers from '../configs/verifyVolunteersGrid'
import candidateList from '../jsons/verifyVolunteers'
import config from '../config'

import { getInvites } from '../actions/invite'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

require('../css/verifyVolunteers.css')

class VerifyVolunteers extends Component{
  constructor(){
    super()
    this.state = {
      candidateList : []
    }
  }

  componentDidMount(){
    if(!this.props.invitedUsers){
      this.props.getInvites()
    }else{
      this.setState({candidateList: this.getInactiveUsers(this.props.invitedUsers)})
    }
  }
  
  componentWillReceiveProps(nextProps){
    this.setState({candidateList: this.getInactiveUsers(nextProps.invitedUsers)})
  }

  getInactiveUsers(users){
    return users.filter(user => {return !user.userActive})
  }

  onSelected(selectedRow){
    console.log(selectedRow)
  }

  render(){
    const { candidateList } = this.state
    
    return(
      <Grid>
        <h3>Verify Volunteers</h3>
        <p>Pleasae select a volunteer to verify or re-invite</p>
        { candidateList.length  > 0 ? 
          <Table 
            headers = {headers}
            rows = {this.state.candidateList}
            collapsible = {false}
            cssStyle = {{width: "100%"}}
            onSelected = {this.onSelected}/>
          : <p>No volunteer invited or pending</p>
        }
      </Grid>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getInvites: getInvites
  }, dispatch);
}

function mapStateToProps(state) {
  return {invitedUsers : state.inviteListReducer}
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticatedPage(VerifyVolunteers));