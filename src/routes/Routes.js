import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import App from '../App'
import UserListPage from '../users/pages/UserListPage'
import UserDetailsPage from '../users/pages/UserDetailsPage'
import UserAddPage from '../users/pages/UserAddPage'

const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/users" component={UserListPage} />
      <Route exact path="/user" component={UserDetailsPage} />
      <Route exact path="/add-user" component={UserAddPage} />
    </Switch>
  </BrowserRouter>
)

export default Routes
