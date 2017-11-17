import React, { Component } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'

import YourVolunteers from '../components/yourVolunteers'
import EventParticipated from '../components/eventParticipated'
import ActiveSince from '../components/activeSince'
import YourDistinctVoters from '../components/yourDistinctVoters'
import UpcomingEvents from '../components/upcomingEvents'
import QuickAddVolunteers from '../components/quickAddVolunteer'
import InviteVolunteerForEvent from '../components/inviteVolunteerForEvent'
import * as HomeActions from '../actions/HomeActions';
import AuthenticatedPage from '../containers/AuthenticatedPage';
import {bindActionCreators} from 'redux';
import _ from 'lodash';
import {connect} from 'react-redux';

require('../css/home.css')

class Home extends Component{
  componentDidMount(){
    
  }

  render(){
    return(
      <Grid>
        <Row>
          <Col  md={7} className="first-column-home">

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

          </Col>

          <Col md={5}>
            <UpcomingEvents />
          </Col>
        </Row>
        <Row>
          <Col  md={12}>
            <InviteVolunteerForEvent />
          </Col>
        </Row>
        <Row>
          <Col  md={12}>
            <QuickAddVolunteers />
          </Col>
        </Row>
      </Grid>
    )
  }
}


function mapStateToProps(state) {
  return {
    token: state.token
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(HomeActions, dispatch);
}

Home.displayName = 'Home';

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticatedPage(Home));