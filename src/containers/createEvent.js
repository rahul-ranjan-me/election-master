import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import Snackbar from 'material-ui/Snackbar'
import AuthenticatedPage from '../containers/AuthenticatedPage'
import config from '../config'
import metadata from '../configs/event'
import Form from '../components/form'
import { createEvent } from '../promises'

import { getAllEvents, createEventAction } from '../actions/events';
import {bindActionCreators} from 'redux';
import _ from 'lodash';
import { connect } from 'react-redux';

require('../css/event.css')

class CreateEvent extends Component{
  constructor(){
    super()

    this.dataStructure = {
      name: '',
      eventLevel: '',
      eventOrganizer: '',
      eventVolunteerRequired: '',
      eventVenue: ''
    }
    this.eventMessage = "Event added and broadcasted successfully"
    this.state = {
      error: null,
      success: null,
      snackStatus: false
    }
  }

  componentDidMount() {
    this.redirectIfAuthed(this.props);
    if(!this.props.events){
      this.props.getAllEvents()
    }
  }

  componentWillReceiveProps(nextProps) {
    this.redirectIfAuthed(nextProps);
  }

  redirectIfAuthed(props) {
    var {location, token} = props;
    if (token) {
      if (location.query.redirectTo) {
        browserHistory.push(location.query.redirectTo);
      } else {
        browserHistory.push('/');
      }
    }
  }
  
  submitData(data){
    createEvent(this.dataStructure)
        .then((res) => {
            this.setState({
                snackStatus: true,
                success: this.eventMessage
            });
            this.props.createEventAction(res.data)
            window.setTimeout( () => {
              this.setState({success: null})
              browserHistory.push('eventManagement')
            }, 4000)
        }).catch((err) => {
            const errorJSON = JSON.parse(JSON.stringify(err))
            this.setState({'error': errorJSON.response && errorJSON.response.data && errorJSON.response.data.error ? errorJSON.response.data.error : 'Some error occured'})
            window.setTimeout(this.setState({error: null}), 4000)
        }) 
  }

  render(){
    const { error, success } = this.state
    
    return(
      <div className="add-event-container">
        <h3>Create event</h3>
        <p>Pleasae add details of event and submit</p>
        {error || success ? <div className={error ? 'error' : 'success'}>{error ? error : success}</div> : null }
        <Form 
          metadata = { metadata } 
          onSubmitData = { this.submitData.bind(this) } 
          dataFormat = { this.dataStructure } 
          cssClassName="add-event-form" /> 
        <Snackbar
          open={this.state.snackStatus}
          message={this.eventMessage}
          autoHideDuration={4000}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getAllEvents: getAllEvents
  , createEventAction: createEventAction
  }, dispatch);
}

function mapStateToProps(state) {
  return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticatedPage(CreateEvent));