import React from 'react';
import CampsiteDetail from './CampsiteDetail';

// Ugh
import createBrowserHistory from 'history/lib/createBrowserHistory';
var browserHistory = createBrowserHistory();

export default class CampsiteDetailPage extends React.Component {
  // TODO Extract back button into its own component
  navigateBack() {
    browserHistory.goBack();
    return false;
  }

  render() {
    let campsite = this.props.campsites[this.props.params.id]
    if (campsite == undefined) {
      return (<div></div>)
    }
    let park = this.props.parks[campsite.park_id]
    campsite = Object.assign({}, campsite, {park: park})
    return (
      <div className="campsite-detail-page">
        <nav className="navbar navbar-default navbar-fixed-top">
          <div className="container">
            <button className="btn btn-link navbar-link navbar-text pull-left" onClick={this.navigateBack}>
              <span className="glyphicon glyphicon-chevron-left back" aria-hidden="true"></span>
            </button>
            <h1>{campsite.shortName}</h1>
          </div>
        </nav>
        <div className="container">
          <CampsiteDetail campsite={campsite} />
        </div>
      </div>
    )
  }
}
