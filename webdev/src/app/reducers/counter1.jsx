import {
  ADD_COUNTER_1,
} from '../constants/ActionTypes'

let initialState = {
  counter: 10,
}

export default function counter1(state = initialState, action) {
  switch (action.type) {
    case ADD_COUNTER_1:
      return {
        counter: state.counter + 1,
      }
    default:
      return state
  }
}