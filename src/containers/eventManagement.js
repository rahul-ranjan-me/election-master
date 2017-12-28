import React, { Component } from 'react'
import Collapsible from 'react-collapsible';
import { browserHistory } from 'react-router'
import AuthenticatedPage from '../containers/AuthenticatedPage'
import config from '../config'

import { getAllEvents } from '../actions/events';
import {bindActionCreators} from 'redux';
import _ from 'lodash';
import { connect } from 'react-redux';

require('../css/event.css')

class EventManagement extends Component{
  constructor(){
    super()
    this.state = {
      events: {
        myEvents: []
      , parentEvents: {}
      , childEvents: {}
      }
    }
  }

  componentDidMount() {
    this.redirectIfAuthed(this.props);
    if(!this.props.events){
      this.props.getAllEvents()
    }else{
      this.setState({
        events: this.props.events
      })
    }
  }

  componentWillReceiveProps(nextProps) {
    this.redirectIfAuthed(nextProps);
    this.setState({
      events: nextProps.events
    })
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

  renderEvents(event, k){
    return (
      <Collapsible trigger={event.name} key={k}>
        <ul>
          <li><span>Level:</span> {event.eventLevel}</li>
          <li><span>Organizer:</span> {event.organizer}</li>
          <li><span>Venue:</span> {event.eventVenue}</li>
          {event.eventDate ? <li><span>Date:</span> {event.eventDate}</li> : null}
          <li><span>Volunteers Coming:</span> {event.eventVolunteerRequired}</li>
        </ul>
      </Collapsible>
    )
  }

  parentChildEvents(keys, events){
    return(
       events[keys].map(this.renderEvents)
    )
  }

  render(){
    const { events } = this.state
        , parentEventsArr = Object.keys(events.parentEvents)
        , childEventsArr = Object.keys(events.childEvents)

    return(
      <div className="event-management">
        <h3>Current Events</h3>
        <h4>My Events</h4>
        <div className="events">
          {events.myEvents.length ? events.myEvents[0].map(this.renderEvents) : null}
        </div>

        <h4>My Parent Events</h4>

        {parentEventsArr.length  > 0 ? parentEventsArr.map((key) => this.parentChildEvents(key, events.parentEvents)): <p>No parents events found</p>}

        <h4>My Children Events</h4>
        {childEventsArr.length  > 0 ? childEventsArr.map((key) => this.parentChildEvents(key, events.childEvents)): <p>No child events found</p>}
        
        
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    getAllEvents: getAllEvents
  }, dispatch);
}

function mapStateToProps(state) {
  return {
    events: state.eventsList
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticatedPage(EventManagement));