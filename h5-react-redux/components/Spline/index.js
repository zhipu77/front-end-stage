import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import './style.less'

export default class CashierLine extends Component {
  render() {
    const { styleClass } = this.props
    return (
      <div className={classnames('row',styleClass)}>
        <div className="col">
          <div className="line-h"></div>
        </div>
      </div>
    )
  }
}


CashierLine.propTypes = {
  styleClass: PropTypes.string,
}