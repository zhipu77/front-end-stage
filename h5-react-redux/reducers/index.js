
import demoReducers from './demoReducers'
import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'



const rootReducer = combineReducers({
  demoReducers,
  routing
})

export default rootReducer
