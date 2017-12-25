import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import config from '../config'
import Form from '../components/form'
import AuthenticatedPage from '../containers/AuthenticatedPage'
import metadata from '../configs/volunteer'
import Snackbar from 'material-ui/Snackbar'

import { newInvite, getInvites } from '../actions/invite';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { addInvitee } from '../promises'

require('../css/addVolunteer.css')

class AddVolunteer extends Component{
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

  componentDidMount(){
    if(!this.props.invitedUsers){
      this.props.getInvites()
    }
  }

  handleRequestClose = () => {
    this.setState({
      snackStatus: false,
    });
  };
  
  submitData(data){
    data.phoneNumber = data.username
    addInvitee(data).then((response) => {
      this.setState({
        snackStatus: true,
        success: this.voluneerMessage
      });
      this.props.newInvite(response.data)
      window.setTimeout(() => browserHistory.push('verifyVolunteers'), 3000)
    }).catch((err) => {
      const errorJSON = JSON.parse(JSON.stringify(err))
      this.setState({'error': errorJSON.response && errorJSON.response.data && errorJSON.response.data.error ? errorJSON.response.data.error : 'Some error occured'})
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    newInvite : newInvite
  , getInvites: getInvites
  }, dispatch);
}

function mapStateToProps(state) {
  return {invitedUsers : state.inviteListReducer}
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticatedPage(AddVolunteer));