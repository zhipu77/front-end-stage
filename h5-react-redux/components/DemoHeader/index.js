import React, { Component, PropTypes } from 'react'

export default class DemoHeader extends Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    const { title,subTitle} = this.props
    return (
      <div className="page-head">
        <h1 className="page-title">{title}</h1>
        <p className="page-desc">{subTitle}</p>
      </div>
    )
  }
}

DemoHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subTitle: PropTypes.string.isRequired
}
