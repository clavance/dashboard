import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout, Minimal as MinimalLayout } from './layouts';

import {
  Dashboard, SignIn, NotFound, Pending, Transactions
} from './views';

const Routes = () => {
  return (
    <Switch>
      <Redirect
        exact
        from="/"
        to="/sign-in"
      />
      <RouteWithLayout
        component={Dashboard}
        exact
        layout={MainLayout}
        path="/dashboard"
      />
      <RouteWithLayout
        component={SignIn}
        exact
        layout={MinimalLayout}
        path="/sign-in"
      />
      <RouteWithLayout
        component={NotFound}
        exact
        layout={MinimalLayout}
        path="/not-found"
      />
      <RouteWithLayout
        component={Pending}
        exact
        layout={MinimalLayout}
        path="/pending"
      />
      <RouteWithLayout
        component={Transactions}
        exact
        layout={MainLayout}
        path="/transactions"
      />
      <Redirect to="/not-found" />
    </Switch>
  );
};

export default Routes;
