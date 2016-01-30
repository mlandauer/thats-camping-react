import React from 'react'

// Ugh
import createBrowserHistory from 'history/lib/createBrowserHistory';
var browserHistory = createBrowserHistory();

export default class Header extends React.Component {
  // TODO Extract back button into its own component
  navigateBack() {
    browserHistory.goBack();
    return false;
  }

  render() {
    return (
      <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container">
          <button className="btn btn-link navbar-link navbar-text pull-left" onClick={this.navigateBack}>
            <span className="glyphicon glyphicon-chevron-left back" aria-hidden="true"></span>
          </button>
          <h1>{this.props.title}</h1>
        </div>
      </nav>
    )
  }
}
