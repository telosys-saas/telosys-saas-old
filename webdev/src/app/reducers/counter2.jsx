import {
  ADD_COUNTER_2,
} from '../constants/ActionTypes'

let initialState = {
  counter: 10,
}

export default function counter2(state = initialState, action) {
  console.log(state)
  switch (action.type) {
    case ADD_COUNTER_2:
      return {
        counter: state.counter + 1,
      }
    default:
      return state
  }
}