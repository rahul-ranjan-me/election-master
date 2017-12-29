import React, { Component } from 'react'
import { Input, Row, Col, Divider, List, Avatar } from 'antd/dist/antd.min'
import { browserHistory } from 'react-router'
import moment from 'moment'
import AuthenticatedPage from '../containers/AuthenticatedPage'
import config from '../config'
import { getUserDetails, getHierarchy } from '../promises'

import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';

const Search = Input.Search;

require('../css/organisationViewer.css')

class PeopleSearchResult extends Component{
  constructor(){
    super()
    this.state = {
      searchedUser: {}
    , hierarchyData: {
        parentUser: {}
      , childUser: []
      }
    }
  }

  componentDidMount() {
    this.redirectIfAuthed(this.props);
    const id = this.props.params.id;
    getHierarchy(id).then((response) => {
      this.setState({
        hierarchyData: response.data
      })
    })

    if(Object.keys(this.props.searchedUser).length < 1){
      this.setUserDetails(id)
    }else{
      this.setState({
        searchedUser: this.props.searchedUser,
      })
    }
  }

  setUserDetails(id){
    getUserDetails(id).then((response) => {
      this.setState({
        searchedUser: response.data
      })
    })
  }

  componentWillReceiveProps(nextProps) {
    this.redirectIfAuthed(nextProps);

    const id = nextProps.params.id;
    getHierarchy(id).then((response) => {
      this.setState({
        hierarchyData: response.data
      })
    })

    this.setUserDetails(id)
    
  }

  redirectIfAuthed(props) {
    var {location, token} = props;
  }

  goToPage(ev, item){
    ev.preventDefault()
    browserHistory.push(`/person/${item.username}`);
  }

  search(val){
    browserHistory.push(`/organisationViewer?search=${val}`);
  }

  render(){
    const { searchedUser, hierarchyData } = this.state
        , { address, avatar, creationDate, email, fatherName, username, lokSabha, name, originParty, vidhanSabha } =  searchedUser 
        , avatarUrl = avatar ? avatar.full_size : ''
        , { parentUser, childUser } = hierarchyData

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
          <Col span={11}>
            <h4>Contact Information</h4>
            <Divider dashed></Divider>
            <ul className="about-details">
              <li>
                <span>Name</span>
                <strong>{name}</strong>
              </li>
              <li>
                <span>Email</span>
                <strong>{email ? email : '-'}</strong>
              </li>
              <li>
                <span>Phone number</span>
                <strong>{username ? username : '-'}</strong>
              </li>
              <li>
                <span>Joining date</span>
                <strong>{creationDate ? moment(creationDate).format('DD-MMM-YYYY') : '-'}</strong>
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
          <Col span={9} className="hierarchy-container">
           {Object.keys(parentUser).length ? <List
              className="parent-user"
              itemLayout="horizontal"
              dataSource={[parentUser]}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src={item.avatar ? item.avatar.full_size : 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'} />}
                    title={item.userActive ? <a onClick={(ev) => this.goToPage(ev, item)} href={`/person/${item.username}`}>{item.name}</a> : <p>{item.name}</p>}
                    description={`Phone number: ${item.username}`}
                  />
                </List.Item>
              )}
            />:null}

            <List
              className="current-user"
              itemLayout="horizontal"
              dataSource={[searchedUser]}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src={item.avatar ? item.avatar.full_size : 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'} />}
                    title={<p>{item.name}</p>}
                    description={`Phone number: ${item.username}`}
                  />
                </List.Item>
              )}
            />

            {childUser.length ? <List
              className="child-user"
              itemLayout="horizontal"
              dataSource={childUser}
              renderItem={item => (
                <List.Item className={!item.userActive ? 'disable': null}>
                  <List.Item.Meta
                    avatar={<Avatar src={item.avatar ? item.avatar.full_size : 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'} />}
                    title={item.userActive ? <a onClick={(ev) => this.goToPage(ev, item)} href={`/person/${item.username}`}>{item.name}</a> : <p>{item.name}</p>}
                    description={`Phone number: ${item.username}`}
                  />
                </List.Item>
              )}
            /> : null }
            
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