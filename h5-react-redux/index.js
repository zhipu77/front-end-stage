import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import { hashHistory ,browserHistory} from 'react-router'
import { syncHistoryWithStore } from 'react-router-redux'
import Root from './containers/Root'
import configureStore from './store/configureStore'
import './stylesheets/style.less'

const store = configureStore()
// const history = syncHistoryWithStore(browserHistory, store)
const history = syncHistoryWithStore(hashHistory, store)
render(
  <Root store={store} history={history} />,
  document.getElementById('root')
)
