import React, { Component } from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import StaticRouter from 'react-router-dom/StaticRouter'

export default class Root extends Component {
  render() {
    const { store, history, routes, type, renderProps, url } = this.props
    return (
      <Provider store={store}>
        {
          type === 'server'
            ? <StaticRouter location={url} context={{}}>{routes}</StaticRouter>
            : <Router>{routes}</Router>
        }
      </Provider>
    )
  }
}
