import React, { Component } from 'react'
import { Input, Row, Col, Divider } from 'antd/dist/antd.min'
import { browserHistory } from 'react-router'
import AuthenticatedPage from '../containers/AuthenticatedPage'
import config from '../config'
import { getUserDetails } from '../promises'

import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

const Search = Input.Search;

require('../css/organisationViewer.css')

class PeopleSearchResult extends Component{
  constructor(){
    super()
    this.state = {
      searchedUser: {}
    }
  }

  componentDidMount() {
    this.redirectIfAuthed(this.props);
    if(Object.keys(this.props.searchedUser).length < 1){
      this.setUserDetails()
    }else{
      this.setState({
        searchedUser: this.props.searchedUser
      })
    }
  }

  setUserDetails(){
    const id = this.props.params.id;
    getUserDetails(id).then((response) => {
      this.setState({
        searchedUser: response.data
      })
    })
  }

  componentWillReceiveProps(nextProps) {
    this.redirectIfAuthed(nextProps);
  }

  redirectIfAuthed(props) {
    var {location, token} = props;
  }

  search(val){
    browserHistory.push(`/organisationViewer?search=${val}`);
  }

  render(){
    const { searchedUser } = this.state
    const { address, avatar, creationDate, email, fatherName, lokSabha, name, originParty, vidhanSabha } =  searchedUser 
        , avatarUrl = avatar ? avatar.full_size : ''

    return(
      <div className="organisation-viewer">
        <div className="search-people">
          <h3>Search people</h3>
          <Search placeholder="Enter name to search" onSearch={this.search.bind(this)} enterButton="Search" size="large" />
        </div>
        <Divider />

        <h3>About {name}</h3>

        <Row className="user-details-container">
          <Col span={4}>
            <img src={avatarUrl} style={{width:'90%'}} />
          </Col>
          <Col span={14}>
            <h4>Contact Information</h4>
            <Divider dashed></Divider>
            <ul className="about-details">
              <li>
                <span>Name</span>
                <strong>{name}</strong>
              </li>
              <li>
                <span>Joining date</span>
                <strong>{creationDate ? creationDate : '-'}</strong>
              </li>
              <li>
                <span>Email</span>
                <strong>{email ? email : '-'}</strong>
              </li>
              <li>
                <span>Address</span>
                <strong><address>{address ? address : '-'}</address></strong>
              </li>
              <li>
                <span>Father name</span>
                <strong>{fatherName ? fatherName : '-'}</strong>
              </li>
              <li>
                <span>Origin Party</span>
                <strong>{originParty ? originParty : '-'}</strong>
              </li>
              <li>
                <span>Lok Sabha</span>
                <strong>{lokSabha ? lokSabha : '-'}</strong>
              </li>
              <li>
                <span>Vidhan Sabha</span>
                <strong>{vidhanSabha ? vidhanSabha : '-'}</strong>
              </li>
            </ul>
          </Col>
          <Col span={6}>
            <h4>Orgainsational hierarchy</h4>
          </Col>
        </Row>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
  
    }, dispatch);
}

function mapStateToProps(state) {
  return {
    searchedUser: state.searchedUser
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticatedPage(PeopleSearchResult));