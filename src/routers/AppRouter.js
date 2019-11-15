import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import AddExpensePage  from '../components/AddExpensePage';
import EditExpensePage  from '../components/EditExpensePage';
import ExpenseDashboardPage  from '../components/ExpenseDashboardPage';
import NotFoundPage  from '../components/NotFoundPage';
import LoginPage from '../components/LoginPage';
import PrivateRoute from './PrivateRoute';
import PublicRoute from './PublicRoute';

// we use history package to have access to history info from each component
export const history = createBrowserHistory();

const AppRouter = () => (
  <Router history={history}>
    <div>
      <Switch>
        <PublicRoute exact path="/" component={LoginPage} />
        <PrivateRoute path="/dashboard" component={ExpenseDashboardPage}/>
        <PrivateRoute path="/create" component={AddExpensePage}/>
        <PrivateRoute path="/edit/:id" component={EditExpensePage}/>
        <PublicRoute component={NotFoundPage} />
      </Switch>
    </div>
</Router>
)

export default AppRouter;