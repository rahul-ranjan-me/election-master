import React from 'react';
import { Link, browserHistory } from 'react-router'
import {connect} from 'react-redux';

/**
 * Higher ordered component for pages requiring authentication.
 */
var AuthenticatedPage = (PageComponent) => {

  class AuthenticatedPage extends React.Component {

    constructor() {
      super();

      this.redirectOnLogout = this.redirectOnLogout.bind(this);
    }

    componentWillMount() {
      var {auth, location} = this.props;
      if (!auth) {
        var query = {redirectTo: (location.pathname + location.search)};
        browserHistory.push({pathname: '/login', query});
      }
    }

    componentWillReceiveProps(nextProps) {
      this.redirectOnLogout(nextProps);
    }

    redirectOnLogout(props) {
      var {auth, location} = props;

      if (!auth && location.pathname !== '/login') {
        browserHistory.push('/login');
      }
    }

    render() {
      var {auth} = this.props;
      if (!auth) {
        return null;
      }

      return (<PageComponent ref="page" {...this.props}/>);
    }
  }

  AuthenticatedPage.displayName = 'AuthenticatedPage';
  AuthenticatedPage.contextTypes = {
    router: React.PropTypes.object.isRequired
  };

  function mapStateToProps(state) {
    return {
      auth: state.loginListReducer.token
    };
  }

  // Wrap the component to inject dispatch and state into it
  return connect(mapStateToProps)(AuthenticatedPage);
};

export default AuthenticatedPage;