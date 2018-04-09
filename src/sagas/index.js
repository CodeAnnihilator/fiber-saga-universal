import { all, fork } from 'redux-saga/effects'

import watchTestSaga from './watchTestSaga.js'

export default function* root() {
  yield all([
    fork(watchTestSaga),
  ])
}
