import React from 'react';
import { IndexRoute, Redirect, Route } from 'react-router';

import AppContainer from '../components/App/AppContainer';
import EventContainer from '../components/Event/EventContainer';
import LoginComponent from '../components/Login/LoginComponent';
import SignupComponent from '../components/Signup/SignupComponent';
import ViewerQuery from './ViewerQuery';

export default (
  <Route path='/' component={AppContainer} queries={ViewerQuery}>
    <IndexRoute component={EventContainer} queries={ViewerQuery} />
    <Route path='/signup' component={SignupComponent} />
    <Route path='/login' component={LoginComponent} />
    <Redirect from='*' to='/' />
  </Route>
);

