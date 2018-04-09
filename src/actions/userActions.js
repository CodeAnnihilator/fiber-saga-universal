export const GET_USER = 'GET_USER'
export const REQUEST_USER_SUCCESS = 'REQUEST_USER_SUCCESS'

export const getUser = () => ({
  type: GET_USER,
  payload: 'SOME USER'
})

export const requestUserSuccess = user => ({
  type: 'REQUEST_USER_SUCCESS',
  payload: user
})
