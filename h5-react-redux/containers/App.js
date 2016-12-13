import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as AppActions from '../actions/AppActions'
import '../stylesheets/style.less'
import '../lib/vera/stylesheet/style.less'
import '../lib/vera/index'
//require('vconsole')

class App extends Component {
  constructor(props) {
    super(props)
    
  }
  render() {
    const { children ,stores , actions,location } = this.props
    var appStores = stores.appReducers
    
    return (
      <div>
        {children}
         
      </div>
    )
  }
}

App.propTypes = {
  // Injected by React Redux
  // Injected by React Router
  children: PropTypes.node
}


function mapStateToProps(state) {
  return {
    stores: state
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(AppActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)

