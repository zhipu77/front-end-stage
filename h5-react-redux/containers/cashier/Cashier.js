import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import * as AppActions from '../../actions/AppActions'
import * as AppConst from '../../constants/AppConst'

import Spline from '../../components/Spline'


class Cashier extends Component {
  constructor(props, context) {
    super(props, context)

    const {actions}=this.props;
    this.actions = actions;

    
  }
  componentWillMount(){
    document.title = 'TEST'
  }
  componentDidMount(){
   
  }

  render() {
    const {actions , stores} = this.props
    const thisStore = stores.cashierReducers
    const pubStore = stores.appReducers
   
   
    return (
      <div className="container">
       

      </div>
    )
  }
}


Cashier.contextTypes = {
   router: PropTypes.object
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
)(Cashier)

