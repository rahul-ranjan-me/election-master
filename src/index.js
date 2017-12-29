import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, browserHistory, IndexRoute } from 'react-router';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import allReducers from './reducers';
import Layout from './structure/outer-structure'; 
import Home from './containers/home'
import VerifyVolunteers from './containers/verifyVolunteers'
import AddVolunteer from './containers/addVolunteer'
import Profile from './containers/profile'
import Signup from './containers/signUp'
import Login from './containers/login'
import CreateEvent from './containers/createEvent'
import EventManagement from './containers/eventManagement'
import OrganisationViewer from './containers/organisationViewer'
import PersonDetails from './containers/personDetails'
import registerServiceWorker from './registerServiceWorker';
//http://www.templatemonsterpreview.com/65839.html
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/css/bootstrap-theme.min.css';
import 'antd/dist/antd.min.css';

import { getInvites } from './actions/invite';

const store = createStore(allReducers, applyMiddleware(thunk));

ReactDOM.render(

    <Provider store={ store }>
      <Router history={ browserHistory }>
        <Route path="/" component={ Layout }>
          <IndexRoute component={ Home } />
          <Route path="verifyVolunteers" component={ VerifyVolunteers } />
          <Route path="addVolunteer" component={ AddVolunteer } />
          <Route path="signup/:id" component={ Signup } />
          <Route path="home" component={ Home } />
          <Route path="login" component={ Login } />
          <Route path="profile" component={ Profile } />
          <Route path="createEvent" component={ CreateEvent } />
          <Route path="eventManagement" component={ EventManagement } />
          <Route path="organisationViewer" component={ OrganisationViewer } />
          <Route path="person/:id" component={ PersonDetails } />
        </Route>
      </Router>
    </Provider>

  , document.getElementById('root'));

registerServiceWorker();