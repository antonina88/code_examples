import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

import MainPage from './features/MainPage/MainPage';
import MovieDetails from './features/Movies/MovieDetails/MovieDetails';
import EditMovie from './features/Movies/EditMovie/EditMovie';
import LoginPage from './features/Authenticate/LoginPage/LoginPage';
import RegisterPage from './features/Authenticate/RegisterPage/RegisterPage';
import Actor from './features/Actor/Actor';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import NotFound from './Components/NotFound/NotFound';

class Routes extends Component {
  render() {
    return (
      <Switch>
        <PrivateRoute
          component={MainPage}
          exact
          path='/'
        />
        <PrivateRoute
          component={MovieDetails}
          exact
          path='/movie/:id'
        />
        <PrivateRoute
          component={Actor}
          exact
          path='/actor/:name'
        />
        <PrivateRoute
          component={EditMovie}
          exact
          path='/edit/:id'
        />
        <Route
          component={LoginPage}
          exact
          path='/login'
        />
        <Route
          component={RegisterPage}
          exact
          path='/register'
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
