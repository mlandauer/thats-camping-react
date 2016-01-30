import React from 'react'
import BackButton from './BackButton'

export default class Header extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container">
          {this.props.hideBackButton ? null : <BackButton />}
          <h1>{this.props.title}</h1>
        </div>
      </nav>
    )
  }
}
