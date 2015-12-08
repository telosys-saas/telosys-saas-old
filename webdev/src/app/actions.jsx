/*
 * action types
 */

export const LOGIN = 'LOGIN'
export const LOGOUT = 'LOGOUT'

/*
 * action creators
 */

export function login(username, password) {
  return { type: LOGIN, username: username, password: password }
}

export function logout(text) {
  return { type: LOGOUT, text }
}
