import { combineReducers } from 'redux'
import typeToReducer from 'type-to-reducer'
import { REQUEST_USER_SUCCESS } from '../actions/userActions.js'

const initialState = {
  user: null,
  isPending: false,
  error: false
}

const userReducer = typeToReducer({
  [REQUEST_USER_SUCCESS]: (state, action) => ({
    ...state,
    user: action.payload
  })
}, initialState)

export default combineReducers({
  userReducer
})
