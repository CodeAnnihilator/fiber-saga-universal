import Express from 'express'
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import compression from 'compression'
import http from 'http'
import path from 'path'
import url from 'url'
import { createMemoryHistory } from 'history'
import { match } from 'react-router'
import { renderToString } from 'react-dom/server'

import config from '../../config/app.config'
import configureStore from '../store/configureStore.dev'
import Html from '../helpers/Html'
import makeRoutes from '../routes'
import waitAll from '../sagas/waitAll'
import Root from '../root/Root'
import setRouterContext from '../helpers/RouterContext'

const app = new Express()
const server = new http.Server(app)

app.disable('x-powered-by')
app.use(compression())
app.use(Express.static(path.join(__dirname, '../..', 'static')))
// app.use(setRouterContext())

app.use((req, res, next) => {
  webpackIsomorphicTools.refresh()
  const store = configureStore()
  const assets = webpackIsomorphicTools.assets()
  const routes = makeRoutes(store)
  const rootComponent = <Root url={req.url} type='server' routes={routes} store={store} />
  const htmlComponent = renderToString(<Html assets={assets} component={rootComponent} store={store} />)
  res.status(200).send(`<!doctype html>\n ${htmlComponent}`)
  // next()
})

// app.use((req, res) => {
//   webpackIsomorphicTools.refresh()
//   const memoryHistory = createMemoryHistory()
//   const store = configureStore()
//   const allRoutes = getRoutes(store)
//   const assets = webpackIsomorphicTools.assets()
//
//   function hydrateOnClient() {
//     const htmlComponent = <Html assets={assets} store={store} />
//     const renderedDomString = ReactDOMServer.renderToString(htmlComponent)
//     res.send(`<!doctype html>\n ${renderedDomString}`)
//   }
//
//   match({ routes: allRoutes, location: req.url }, (error, redirectLocation, renderProps) => {
//     if (redirectLocation) {
//       res.redirect(redirectLocation.pathname + redirectLocation.search)
//     } else if (error) {
//       console.error('ROUTER ERROR:', error)
//       res.status(500)
//       hydrateOnClient()
//     } else if (renderProps) {
//       const rootComponent = (
//         <Root
//           store={store}
//           routes={allRoutes}
//           history={memoryHistory}
//           renderProps={renderProps}
//           type="server"
//         />
//       )
//
//       const preloaders = renderProps.components
//         .filter(component => component && component.preload)
//         .map(component => component.preload(renderProps.params, req))
//         .reduce((result, preloader) => result.concat(preloader), [])
//
//       const runTasks = store.runSaga(waitAll(preloaders))
//
//       runTasks.done.then(() => {
//         const htmlComponent = <Html assets={assets} component={rootComponent} store={store} />
//         const renderedDomString = ReactDOMServer.renderToString(htmlComponent)
//         res.status(200).send(`<!doctype html>\n ${renderedDomString}`)
//       }).catch(e => {
//         console.log(e.stack)
//       })
//       store.close()
//     } else {
//       res.status(404).send('Not found')
//     }
//   })
// })
//
if (config.port) {
  server.listen(config.port, err => {
    if (err) {
      console.error(err)
    } else {
      console.info('Open http://%s:%s in a browser to view the app.', config.host, config.port)
    }
  })
} else {
  console.error('ERROR: No PORT environment variable has been specified')
}
