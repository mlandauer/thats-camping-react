import React from 'react'

// Ugh
import createBrowserHistory from 'history/createBrowserHistory';
var browserHistory = createBrowserHistory();

export default class Header extends React.Component {
  navigateBack() {
    browserHistory.goBack();
    return false;
  }

  render() {
    return (
      <button className="btn btn-link navbar-link navbar-text pull-left" onClick={this.navigateBack}>
        <i className="fa fa-chevron-left"></i>
      </button>
    )
  }
}
