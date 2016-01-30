import React from 'react'
import { Link } from 'react-router'

export default class Header extends React.Component {
  render() {
    return (
      <Link to="/about" className="btn navbar-link navbar-text pull-right">
        <span className="glyphicon glyphicon-info-sign" aria-hidden="true"></span>
      </Link>
    )
  }
}
