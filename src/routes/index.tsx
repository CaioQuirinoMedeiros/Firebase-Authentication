import React from 'react'
import { BrowserRouter, Switch } from 'react-router-dom'

import Signup from '../components/Signup'
import Login from '../components/Login'
import Dashboard from '../components/Dashboard'
import UpdateProfile from '../components/UpdateProfile'
import ForgotPassword from '../components/ForgotPassword'

import Route from './Route'

export default function Routes() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route exact path='/' component={Dashboard} isPrivate />
        <Route
          exact
          path='/update-profile'
          component={UpdateProfile}
          isPrivate
        />
        <Route path='/login' component={Login} />
        <Route path='/forgot-password' component={ForgotPassword} />
        <Route path='/signup' component={Signup} />
      </Switch>
    </BrowserRouter>
  )
}
