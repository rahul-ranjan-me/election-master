import React, { Component } from 'react'
import { Badge } from 'react-bootstrap'

import { getInvites } from '../actions/invite'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

require('../css/yourVolunteers.css')

class YourVolunteers extends Component{
  constructor(){
    super()
    this.state = {
      candidateList : []
    , inactiveUsers: []
    , activeUsers: []
    }
  }

  componentDidMount(){
    const { invitedUsers } = this.props
    if(!invitedUsers){
      this.props.getInvites()
    }else{
      this.setState({
        candidateList: invitedUsers
      , inactiveUsers: this.getUsers(invitedUsers, false).length
      , activeUsers: this.getUsers(invitedUsers, true).length
      })
    }
  }
  
  componentWillReceiveProps(nextProps){
    const { invitedUsers } = nextProps
    this.setState({
      candidateList: invitedUsers
    , inactiveUsers: this.getUsers(invitedUsers, false).length
    , activeUsers: this.getUsers(invitedUsers, true).length
    })
  }

  getUsers(users, isActive){
    return users.length ? isActive ? users.filter(user => {return user.userActive}) : users.filter(user => {return !user.userActive}) : []
  }

  render(){
    const { activeUsers, inactiveUsers } = this.state

    return(
      <div className="yourVolunteer">
        <h3>Your Volunteers</h3>
        <p>Active <Badge>{activeUsers}</Badge></p>
        <p>In-Active <Badge>{inactiveUsers}</Badge></p>
        <p>Total Volunteers <Badge>{activeUsers+inactiveUsers}</Badge></p>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getInvites: getInvites
  }, dispatch);
}

function mapStateToProps(state) {
  return {
    token: state.token
  , invitedUsers: state.inviteList
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(YourVolunteers);