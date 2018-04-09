import { takeEvery, call, put } from 'redux-saga/effects'
import { GET_USER, requestUserSuccess } from './../actions/userActions'
import { getUserRequest } from '../api/userApi'

function* getUser() {
  const { data: user } = yield call(getUserRequest)
  yield put(requestUserSuccess(user))
}

function* watchTestSaga() {
  yield takeEvery(GET_USER, getUser)
}

export default watchTestSaga
