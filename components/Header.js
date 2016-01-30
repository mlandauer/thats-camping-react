import React from 'react'
import BackButton from './BackButton'
import AboutButton from './AboutButton'

export default class Header extends React.Component {
  render() {
    return (
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container">
          {this.props.hideBackButton ? null : <BackButton />}
          {this.props.showAboutButton ? <AboutButton /> : null}
          <h1>{this.props.title}</h1>
        </div>
      </nav>
    )
  }
}
