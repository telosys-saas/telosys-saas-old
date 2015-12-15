import {
  REFRESH, LOGIN_FORM, LOGOUT,
} from '../constants/ActionTypes'

let initialState = {
  authenticated: false,
}

export default function auth(state = initialState, action) {
  console.log('auth - action.type:',action.type);
  switch (action.type) {
    case REFRESH:
      return {
        authenticated: true,
      }
    case LOGIN_FORM:
      return {
        authenticated: true,
      }
    case LOGOUT:
      return {
        authenticated: false,
      }
    default:
      return state
  }
}