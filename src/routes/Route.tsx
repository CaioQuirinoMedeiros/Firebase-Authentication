import React from 'react'
import { Route, RouteProps, Redirect } from 'react-router-dom'

import { useAuth } from '../contexts/AuthContext'

interface MyRouteProps extends RouteProps {
  isPrivate?: boolean
  guest?: boolean
}

const MyRoute: React.FC<MyRouteProps> = ({ isPrivate, ...rest }) => {
  const { currentUser } = useAuth()

  return !!isPrivate === !!currentUser ? (
    <Route {...rest} />
  ) : (
    <Redirect
      to={{
        pathname: isPrivate ? '/login' : '/',
        state: { from: rest.location }
      }}
    />
  )
}

export default MyRoute
