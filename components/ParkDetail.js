import React, { PropTypes } from 'react';
import CampsiteList from './CampsiteList'

// Ugh
import createBrowserHistory from 'history/lib/createBrowserHistory';
var browserHistory = createBrowserHistory();

export default class ParkDetail extends React.Component {
  getDescription() {
    return {__html: this.props.park.description};
  }

  // TODO Extract back button into its own component
  navigateBack() {
    browserHistory.goBack();
    return false;
  }

  render() {
    let campsites = this.props.park.campsite_ids.map((campsite_id) => {
      return this.props.campsites[campsite_id]
    })
    return (
      <div className="campsite-detail">
        <nav className="navbar navbar-default navbar-fixed-top">
          <div className="container">
            <button className="btn btn-link navbar-link navbar-text pull-left" onClick={this.navigateBack}>
              <span className="glyphicon glyphicon-chevron-left back" aria-hidden="true"></span>
            </button>
            <h1>{this.props.park.shortName}</h1>
          </div>
        </nav>
        <div className="container">
          <h2>{this.props.park.longName}</h2>
          <div dangerouslySetInnerHTML={this.getDescription()}/>
        </div>
        <CampsiteList campsites={campsites} position={this.props.position} />
      </div>
    )
  }
}

ParkDetail.propTypes = {
  park: PropTypes.object.isRequired,
  campsites: PropTypes.objectOf(PropTypes.object).isRequired,
  position: PropTypes.shape({
    lat: PropTypes.number,
    lng: PropTypes.number
  })
}
