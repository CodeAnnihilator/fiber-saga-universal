import React from 'react'
import { Route, Switch } from 'react-router'
import TestComponent from './components/Test/TestComponent.js'

export default () => {
  const routes = (
    <Switch>
      <Route path="/a" component={TestComponent} />
      <Route path="/s" component={() => <div>SSSs</div>} />
    </Switch>
  )
  return routes
}
