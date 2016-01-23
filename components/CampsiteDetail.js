import React, { PropTypes } from 'react';
import { Link } from 'react-router';

// Ugh
import createBrowserHistory from 'history/lib/createBrowserHistory';
var browserHistory = createBrowserHistory();

export default class CampsiteDetail extends React.Component {
  getDescription() {
    return {__html: this.props.campsite.description};
  }

  // TODO Extract back button into its own component
  navigateBack() {
    browserHistory.goBack();
    return false;
  }

  facilitiesText() {
    var have = this.props.campsite.facilities.have;
    var notHave = this.props.campsite.facilities.notHave;

    var r = "";
    if (have.length > 0) {
      r = r + "Has " + this.listAsText(have);
    }
    if (notHave.length > 0) {
      if (have.length > 0) {
        r = r + " but no ";
      } else {
        r = r + "No ";
      }
      r = r + this.listAsText(notHave);
    }
    return r;
  }

  accessText() {
    var have = this.props.campsite.access.have;
    var notHave = this.props.campsite.access.notHave;

    var r = "";
    if (have.length > 0) {
      r = r + "For " + this.listAsText(have);
    }
    if (notHave.length > 0) {
      if (have.length > 0) {
        r = r + " but not for ";
      } else {
        r = r + "Not for ";
      }
      r = r + this.listAsText(notHave);
    }
    return r;
  }

  mapUrl() {
    return "https://maps.google.com/maps?" +
      "daddr=" +
      this.props.campsite.position.lat + "," + this.props.campsite.position.lng;
  }

  // Returns true if the "directions to campsite" button should be enabled
  // For this we need an internet connection and the campsite needs a location
  directionsEnabled() {
    // TODO Disable this button if there is no internet connection
    return (this.props.campsite.position.lat != undefined && this.props.campsite.position.lng != undefined)
  }

  render() {
    return (
      <div className="campsite-detail">
        <nav className="navbar navbar-default navbar-fixed-top">
          <div className="container">
            <button className="btn btn-link navbar-link navbar-text pull-left" onClick={this.navigateBack}>
              <span className="glyphicon glyphicon-chevron-left back" aria-hidden="true"></span>
            </button>
            <h1>{this.props.campsite.name}</h1>
          </div>
        </nav>
        <div className="container">
          <h2>
            In <Link to={"/parks/" + this.props.park.id}>{this.props.park.longName}</Link>
          </h2>
          <div dangerouslySetInnerHTML={this.getDescription()}/>
          <h2>Facilities</h2>
          <p>{this.facilitiesText()}</p>
          <h2>Access</h2>
          <p>{this.accessText()}</p>
          <a href={this.mapUrl()} className="directions btn btn-default" disabled={this.directionsEnabled() ? "" : "disabled"}>Directions to campsite</a>
        </div>
      </div>
    )
  }

  listAsText(list) {
    if (list.length == 0) {
      return null;
    }
    else if (list.length == 1) {
      return list[0];
    }
    else {
      return list.slice(0, -1).join(", ") + " and " + list[list.length - 1];
    }
  }
}

CampsiteDetail.propTypes = {
  campsite: PropTypes.shape({
    description: PropTypes.string,
    facilities: PropTypes.shape({
      have: PropTypes.arrayOf(PropTypes.string),
      notHave: PropTypes.arrayOf(PropTypes.string)
    }),
    access: PropTypes.shape({
      have: PropTypes.arrayOf(PropTypes.string),
      notHave: PropTypes.arrayOf(PropTypes.string)
    }),
    position: PropTypes.shape({
      lat: PropTypes.number,
      lng: PropTypes.number
    }),
    name: PropTypes.string
  }).isRequired,
  park: PropTypes.shape({
    id: PropTypes.number,
    longName: PropTypes.string
  }).isRequired
}
