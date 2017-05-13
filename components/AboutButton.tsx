import * as React from 'react'
import { Link } from 'react-router-dom'

export const AboutButton = () =>
  <Link to="/about" className="btn navbar-link navbar-text pull-right">
    <i className="fa fa-info-circle"></i>
  </Link>
