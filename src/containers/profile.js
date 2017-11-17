import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'

import YourVolunteers from '../components/yourVolunteers'
import EventParticipated from '../components/eventParticipated'
import ActiveSince from '../components/activeSince'
import YourDistinctVoters from '../components/yourDistinctVoters'

require('../css/profile.css')

export default class Profile extends Component{
  render(){

    return(
      <Grid>
        <h3>Your Profile</h3>
        <p>Pleasae select a volunteer to verify or re-invite</p>

        <Row className="topRow-home">
          <Col md={6}>
            <YourVolunteers />
          </Col>
          <Col md={6}>
            <EventParticipated />
          </Col>
        </Row>

        <Row className="topRow-home">
          <Col md={6}>
            <ActiveSince />
          </Col>
          <Col md={6}>
            <YourDistinctVoters />
          </Col>
        </Row>
      </Grid>
        
    )
  }
}