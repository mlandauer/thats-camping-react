import React from 'react'
import { Link } from 'react-router-dom'

export default class Header extends React.Component {
  render() {
    return (
      <Link to="/about" className="btn navbar-link navbar-text pull-right">
        <i className="fa fa-info-circle"></i>
      </Link>
    )
  }
}
