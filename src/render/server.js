import Express from 'express'
import React from 'react'
import compression from 'compression'
import http from 'http'
import path from 'path'
import { renderToString } from 'react-dom/server'

import config from '../../config/app.config'
import configureStore from 'store/configureStore.dev'
import Html from 'helpers/Html'
import makeRoutes from 'routes'
import Root from 'root/Root'

import sagas from 'sagas'

const app = new Express()
const server = new http.Server(app)

app.disable('x-powered-by')
app.use(compression())
app.use(Express.static(path.join(__dirname, '../..', 'static')))

app.use((req, res) => {
  webpackIsomorphicTools.refresh()
  const store = configureStore()
  const assets = webpackIsomorphicTools.assets()
  const routes = makeRoutes(store)

  const rootComponent = <Root url={req.url} type='server' routes={routes} store={store} />
  store.runSaga(sagas).done.then(() => {
    const state = store.getState()
    const htmlComponent = renderToString(<Html assets={assets} component={rootComponent} store={store} />)
    res.status(200).send(`<!doctype html>\n ${htmlComponent}`)
  })
  renderToString(rootComponent)
  store.close()
})

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
