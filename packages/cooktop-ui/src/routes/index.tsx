import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';
import Main from '../pages/Main';
import { Login } from '../pages/Login';

const Routes: React.FC = () => (
  <Switch>
    <Route exact path="/" component={Main} isPrivate />
    <Route
      exact
      path="/login"
      component={() => <Login></Login>}
    />
  </Switch>
);

export default Routes;
