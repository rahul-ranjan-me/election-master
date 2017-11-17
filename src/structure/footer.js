import React, { Component } from 'react'
import config from '../config'
import { Navbar, Nav, NavItem } from 'react-bootstrap'

require('../css/footer.css')

export default class Footer extends Component{
  constructor(props){
    super(props)
    this.isLogin = this.getIsLogin()
  }

  getIsLogin(){
    if(!config.getToken()){
      return false
    }
    return true
  }

  render(){
    return(
      <div>
        { this.isLogin ? 
          <Navbar className="footer">
            <span className="copyRight">&copy; Master</span>
            <Nav pullRight>
                <NavItem eventKey={1} href="#">About us</NavItem>
                <NavItem eventKey={2} href="#">Contact us</NavItem>
            </Nav>
          </Navbar> : null
        }
      </div>
    )
  }
}