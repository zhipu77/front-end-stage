import merge from 'lodash/merge'
import * as AppConst from '../constants/AppConst'

const initialState = {
  DEMO_USERNAME_IPT_WRITE_VALUE:{
    val: '',
    isError: false
  }
  
};

export default function demoReducers(state = initialState, action) {
  switch (action.type) {
    
    case AppConst.DEMO_USERNAME_IPT_WRITE_VALUE:
      var s = {
          DEMO_USERNAME_IPT_WRITE_VALUE: {
            val: action.data
          }
      }
      return merge({}, state,  s)  
       
    default:
      return state
  }
}

