import { combineReducers } from 'redux'
import { LOGIN, LOGOUT } from './actions'

function visibilityFilter(state = [], action) {
  switch (action.type) {
    default:
      return state
  }
}

function auth(state = [], action) {
  switch (action.type) {
    case LOGIN:
      alert('login username='+action.username+', password='+action.password);
      return [
        ...state,
        {
          text: action.username,
          completed: false,
        },
      ]
    case LOGOUT:
      return [
        ...state.slice(0, action.index),
        Object.assign({}, state[action.index], {
          completed: true,
        }),
        ...state.slice(action.index + 1),
      ]
    default:
      return state
  }
}

const appData = combineReducers({
  auth,
  visibilityFilter,
})

export default appData