import React, {Component} from 'react'
import { browserHistory, Link } from 'react-router'
import { Navbar, Nav, NavDropdown, NavItem, MenuItem } from 'react-bootstrap'
import config from '../config'
import $ from 'jquery'
import { login, logout } from '../actions/Login'
import { bindActionCreators } from 'redux'
import {connect} from 'react-redux'

class TopHeader extends Component{
  constructor(){
    super()
    this.isLogin = this.getIsLogin()
    this.logout = this.logout.bind(this)
    this.state = {
      usersName: ''
    }
  }

  componentWillReceiveProps(props){
    this.isLogin = this.getIsLogin()
    this.getUserDetails()
    this.forceUpdate()
  }

  componentDidMount(){
    this.getUserDetails()
  }

  getUserDetails(){
    if(this.isLogin){
      $.ajax({
        url:`${config.apiBaseURL}/users/me`
      , method : 'get'
      , contentType : "application/json"
      , headers : {
        'Authorization' : 'Token '+config.getToken()
      }
      , dataType: 'json'
      , success : (response) => {
          this.setState({
            usersName : 'Welcome ' + response.name
          })
        }
      })
    }
  }

  getIsLogin(){
    if(!config.getToken()){
      return false
    }
    return true
  }

  logout(){
    config.setToken()
    this.props.logout()
    this.goToPage('login')
  }

  goToPage(hash){
    browserHistory.push(hash);
  }

  render(){

    return(
      <div>
        { this.isLogin ? 
          <Navbar inverse collapseOnSelect>
            <Navbar.Header>
              <Navbar.Brand>
                <a onClick = {() => this.goToPage('/')} href="#">Master</a>
              </Navbar.Brand>
              <Navbar.Toggle />
            </Navbar.Header>
            <Navbar.Collapse>
              <Nav>
                [
                  <NavItem eventKey={2} key={2} onClick = {() => this.goToPage('addVolunteer')} href="#">Add Volunteer</NavItem>
                  ,<NavItem eventKey={4} key={4} onClick = {() => this.goToPage('verifyVolunteers')} href="verifyVolunteers">Verify/Update Volunteer</NavItem>
                  ,<NavDropdown eventKey={3} key={3} title="Events" id="basic-nav-dropdown">
                    <MenuItem eventKey={3.1} key={3.1}>MLA Election</MenuItem>
                    <MenuItem eventKey={3.2} key={3.2}>Haryana MCD</MenuItem>
                    <MenuItem eventKey={3.3} key={3.3}>Gujrat State</MenuItem>
                    <MenuItem divider />
                    <MenuItem eventKey={3.4} key={3.4} onClick = {() => this.goToPage('createEvent')}>Create new event</MenuItem>
                  </NavDropdown>
                ]
              </Nav>
              <Nav pullRight>
                <NavDropdown eventKey={7} title={this.state.usersName} id="basic-nav-dropdown">
                  <MenuItem eventKey={7.1} onClick = {() => this.goToPage('profile')}>Your profile</MenuItem>
                  <MenuItem divider />
                  <MenuItem eventKey={7.2} onClick = {() => this.logout()}>Logout</MenuItem>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>
          </Navbar> : null }
      </div>

    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    login : login
  , logout : logout
  }, dispatch);
}

function mapStateToProps(state) {
  return {token : state.loginListReducer.token}
}

export default connect(mapStateToProps, mapDispatchToProps)(TopHeader);