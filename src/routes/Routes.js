import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import App from '../App'
import UserListPage from '../users/pages/UserListPage'


const Routes = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={App} />
      <Route exact path="/users" component={UserListPage} />
    </Switch>
  </BrowserRouter>
)

export default Routes
