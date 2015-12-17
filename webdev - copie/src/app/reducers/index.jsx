import { combineReducers } from 'redux'
import counter1 from './counter1'
import counter2 from './counter2'
import auth from './auth'

const rootReducer = combineReducers({
  counter1,
  counter2,
  auth,
})

export default rootReducer
