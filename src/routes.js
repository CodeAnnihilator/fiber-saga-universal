import React from 'react'
import { Route, Switch } from 'react-router'

export default () => {
  const routes = (
    <Switch>
      <Route path="/a" render={() => <div>AAAs22222</div>} />
      <Route path="/s" render={() => <div>SSSs</div>} />
    </Switch>
  )
  return routes
}
