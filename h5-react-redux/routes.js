import React from 'react'
import { Route } from 'react-router'
import App from './containers/App'
import * as AppConst from './constants/AppConst'



const login = (location, callback) => {
  require.ensure([], require => {
    callback(null, require('./containers/login/Login').default)
  }, 'login')  
}


let base = AppConst.BASE
export default (
  <Route path={base} component={App}>
    <Route path={base+"/login"} getComponent={login} /> 
  </Route>
)
