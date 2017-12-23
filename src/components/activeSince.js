import React, { Component } from 'react'
import { Badge } from 'react-bootstrap'

import { getUserDetails } from '../actions/User'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

require('../css/activeSince.css')

class ActiveSince extends Component{
  constructor(){
    super()
    this.state = {
      userDetails: {}
    }
  }

  componentDidMount(){
    const { userDetails } = this.props
    if(!Object.keys(userDetails).length){
      this.props.getUserDetails()
    }else{
      this.setState({
        userDetails: userDetails
      })
    }
  }
  
  componentWillReceiveProps(nextProps){
    this.setState({
      userDetails: nextProps.userDetails
    })
  }

  render(){
    let { userActive, creationDate: activeSince } = this.state.userDetails

    userActive = userActive ? 'Active' : 'Inactive'
    activeSince = new Date(activeSince).toDateString()

    return(
      <div className="activeSince">
        <h3>Active Since</h3>
        <p><i>{activeSince}</i></p>
        <h3>Your current status</h3>
        <p><Badge>{userActive}</Badge></p>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getUserDetails: getUserDetails
  }, dispatch);
}

function mapStateToProps(state) {
  return {
    userDetails: state.userDetails
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ActiveSince);