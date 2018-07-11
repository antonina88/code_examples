import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import MainPage from './components/MainPage';
import NotFound from './components/NotFound';
import NotePage from './features/NotePage';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <Route
          component={MainPage}
          exact
          path='/'
        />
        <Route
          component={NotePage}
          exact
          path='/notes/:id'
        />
        <Route
          component={NotFound}
          path='*'
        />
      </Switch>
    );
  }
}

export default Routes;
