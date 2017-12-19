import React, { Component } from 'react'
import { Grid, Row, Col, Glyphicon } from 'react-bootstrap'

import Form from './form'
import BulkInvite from './bulkInvite'
import ResendInvite from './resendInvite'

import Snackbar from 'material-ui/Snackbar'

import { newInvite, getInvites } from '../actions/invite';
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { addInvitee } from '../promises'

require('../css/quickAddVolunteers.css')

class quickAddVolunteers extends Component{
  constructor(props){
    super(props)

    this.metadata = [
      {
        'id' : 'name',
        'label' : 'Name',
        'type' : 'text',
        'value': ''
      },
      {
        'id' : 'email',
        'label' : 'Email',
        'type' : 'text',
        'value': ''
      },
      {
        'id' : 'username',
        'label' : 'Phone Number',
        'type' : 'text',
        'value': ''
      }	
    ],

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

  resetForm(){
    for(var i in this.metadata){
      this.metadata[i].value = ''
    }
  }

  submitData = (data) => {
    data.phoneNumber = data.username
    addInvitee(data).then((response) => {
      this.setState({
        snackStatus: true,
        success: this.voluneerMessage
      });
      this.props.newInvite(response.data)
      this.resetForm()
      window.setTimeout(() => {
        this.setState({success: false})
      }, 3000)
    }).catch((err) => {
      const errorJSON = JSON.parse(JSON.stringify(err))
      this.setState({'error': Object.keys(errorJSON).length ? errorJSON.response.data.error ? errorJSON.response.data.error : 'Some error occured' : null})
      window.setTimeout(() => {
        this.setState({error: false})
      }, 3000)
    }) 
  }

  render(){
    const { error, success } = this.state
    console.log(this.metadata)
    return(
      <div className="quickAddVolunteers">
        <h3><Glyphicon glyph="plus" /> Add Volunteers</h3>

        <Grid>
          <Row>
            <Col md={4}>
              <h5>Add single volunteer</h5>
              {error || success ? <div className={error ? 'error' : 'success'}>{error ? error : success}</div> : null }
              <Form 
                metadata={this.metadata} 
                onSubmitData={this.submitData} 
                dataFormat = {this.dataStructure} 
                cssClassName="quick-invite-form" /> 
                <Snackbar
                  open={this.state.snackStatus}
                  message={this.voluneerMessage}
                  autoHideDuration={4000}
                  onRequestClose={this.handleRequestClose}
                />
            </Col>
            <Col md={4}>
              <BulkInvite />
            </Col>
            <Col md={4}>
              <ResendInvite />
            </Col>
          </Row>
        </Grid>
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

export default connect(mapStateToProps, mapDispatchToProps)(quickAddVolunteers);