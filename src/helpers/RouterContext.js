import React, { Component } from 'react'
import { renderToString } from 'react-dom/server'
import StaticRouter from 'react-router-dom/StaticRouter'
import { Provider } from 'react-redux'
import matchPath from 'react-router-dom/matchPath'

import configureStore from '../store/configureStore.dev'
import makeRoutes from '../routes'

// function getMatch(url) {
//   return routes
//     .find((route) => matchPath(url, route.path, { exact: true, strict: false }))
// }

// async function getData(dispatch, req) {
//   const needs = []
//   routes
//     .filter((route) => route.component.needs)
//     .map((route) => {
//       const match = getMatch(req.url)
//       if (match){
//         route.component.needs.map((need) => needs.push(dispatch(need(match.params))))
//       }
//     })
//   await Promise.all(needs)
// }

class Markup extends Component {
  render() {
    const { url, store } = this.props
    return (
      <Provider store={store}>
        <StaticRouter location={url} context={{}} >
          { makeRoutes() }
        </StaticRouter>
      </Provider>
    )
  }
}

function setRouterContext() {
  return async (req, res, next) => {
    const store = configureStore()
    const markup = renderToString(<Markup url={req.url} store={store} />)
    // await getData(store.dispatch, req.request)
    // const match = getMatch(req.url)
    // req.status = match ? 200 : 404
    req.status = 200
    req.initialState = store.getState()
    req.markup = markup
    await next()
  }
}

export default setRouterContext
