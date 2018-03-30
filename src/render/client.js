import React from 'react'
import ReactDOM from 'react-dom'
import createHistory from 'history/createBrowserHistory'

import configureStore from '../store/configureStore.dev'
import rootSaga from '../sagas'
import Root from '../root/Root'
import getRoutes from '../routes'

const store = configureStore(window.__data)
const destination = document.getElementById('content')

store.runSaga(rootSaga)

ReactDOM.render(
  <Root
    store={store}
    history={createHistory()}
    routes={getRoutes(store)}
  />,
  destination
)
