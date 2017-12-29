import React, { Component } from 'react'
import { Input, List, Avatar } from 'antd/dist/antd.min'
import { browserHistory } from 'react-router'
import AuthenticatedPage from '../containers/AuthenticatedPage'
import config from '../config'
import { searchPeople } from '../promises'
import { setSerachedUser } from '../actions/Search'
import {bindActionCreators} from 'redux';
import _ from 'lodash';
import { connect } from 'react-redux';

const Search = Input.Search;

require('../css/organisationViewer.css')

class OrganisationViewer extends Component{
  constructor(){
    super()
    this.state = {
      data: []
    , query: null
    }
  }

  componentDidMount() {
    this.redirectIfAuthed(this.props);
    const searchQuery = this.props.location.query.search
    if(searchQuery){
      this.search(searchQuery)
      this.setState({query: searchQuery})
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

  goToPage(ev, item){
    ev.preventDefault()
    this.props.setSerachedUser(item)
    browserHistory.push(`/person/${item.username}`);
  }

  search(query){
    if(query.length > 0){
      searchPeople(query).then((response) => {
        this.setState({data: response.data})
      })
    }
  }

  render(){
    const { data } = this.state
    return(
      <div className="organisation-viewer">
        <h3>Search people</h3>
        <Search placeholder={this.state.query ? this.state.query : "Enter name to search"} onSearch={this.search.bind(this)} enterButton="Search" size="large" />
        
        <List
          itemLayout="horizontal"
          dataSource={data}
          renderItem={item => (
            <List.Item className={!item.userActive ? 'disable': null}>
              <List.Item.Meta
                avatar={<Avatar src={item.avatar ? item.avatar.full_size : 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'} />}
                title={item.userActive ? <a onClick={(ev) => this.goToPage(ev, item)} href={`/person/${item.username}`}>{item.name}</a> : <p>{item.name}</p>}
                description={`Phone number: ${item.username}, email: ${item.email}, Party: ${item.originParty}`}
              />
            </List.Item>
          )}
        />
        
        
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({
    setSerachedUser: setSerachedUser
  }, dispatch);
}

function mapStateToProps(state) {
  return {
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticatedPage(OrganisationViewer));