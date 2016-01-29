import React, { PropTypes } from 'react';
import { Link } from 'react-router';

export default class CampsiteDetail extends React.Component {
  getDescription() {
    return {__html: this.props.campsite.description};
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
    return (this.props.campsite.position.lat != undefined && this.props.campsite.position.lng != undefined && navigator.onLine)
  }

  render() {
    return (
      <div className="campsite-detail">
        <h2>
          In <Link to={"/parks/" + this.props.campsite.park.id}>{this.props.campsite.park.longName}</Link>
        </h2>
        <div dangerouslySetInnerHTML={this.getDescription()}/>
        <h2>Facilities</h2>
        <p>{this.facilitiesText()}</p>
        <h2>Access</h2>
        <p>{this.accessText()}</p>
        <a href={this.mapUrl()} className="directions btn btn-default" disabled={this.directionsEnabled() ? "" : "disabled"}>Directions to campsite</a>
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
    description: PropTypes.string.isRequired,
    facilities: PropTypes.shape({
      have: PropTypes.arrayOf(PropTypes.string).isRequired,
      notHave: PropTypes.arrayOf(PropTypes.string).isRequired,
    }).isRequired,
    access: PropTypes.shape({
      have: PropTypes.arrayOf(PropTypes.string).isRequired,
      notHave: PropTypes.arrayOf(PropTypes.string).isRequired
    }).isRequired,
    // TODO If position is not present then position should be null, not position.lat
    position: PropTypes.shape({
      lat: PropTypes.number,
      lng: PropTypes.number
    }).isRequired,
    park: PropTypes.shape({
      id: PropTypes.number.isRequired,
      longName: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
}
