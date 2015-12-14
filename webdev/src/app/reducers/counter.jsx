import {
  ADD_COUNTER,
} from '../constants/ActionTypes'

let initialState = {
  counter: 10,
}

export default function counter(state = initialState, action) {
  console.log(state)
  switch (action.type) {
    case ADD_COUNTER:
      return {
        counter: state.counter + 1,
      }
    default:
      return state
  }
}