import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import simpleFormat from '../libs/simpleFormat'
import Star from './Star'

export default class CampsiteDetail extends React.Component {
  getDescription() {
    return {__html: simpleFormat(this.props.campsite.description)};
  }

  facilitiesText(facilities) {
    var fields = this.facilitiesFields(facilities)
    var have = fields.have;
    var notHave = fields.notHave;

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

  accessText(access) {
    var fields = this.accessFields(access)
    var have = fields.have;
    var notHave = fields.notHave;

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

  accessFields(access) {
    var have = [];
    var notHave = [];

    var caravans = access.caravans;
    var trailers = access.trailers;
    var car = access.car;

    if (caravans) {
      have.push("caravans");
    }
    else {
      notHave.push("caravans");
    }
    if (trailers) {
      have.push("trailers");
    }
    else {
      notHave.push("trailers");
    }
    if (car) {
      have.push("car camping");
    }
    else {
      notHave.push("car camping");
    }

    return {have: have, notHave: notHave};
  }

  toilets(toilets) {
    if (toilets == "flush") {
      return {"have": "flush toilets"}
    }
    else if (toilets == "non_flush") {
      return {"have": "non-flush toilets"}
    }
    else if (toilets == "none") {
      return {"notHave": "toilets"}
    }
    else {
      return {}
    }
  }

  merge(r, t) {
    // TODO Generalise this
    if (t["have"]) {
      r["have"].push(t["have"])
    }
    if (t["notHave"]) {
      r["notHave"].push(t["notHave"])
    }
  }

  picnicTables(picnicTables) {
    if (picnicTables) {
      return {"have": "picnic tables"}
    }
    else {
      return {"notHave": "picnic tables"}
    }
  }

  barbecues(barbecues) {
    // TODO: show whether you need to bring your own firewood elsewhere
    // Like "You will need to bring firewood (if you want to use the wood BBQs) and drinking water"
    if (barbecues == "wood" || barbecues == "wood_supplied" || barbecues == "wood_bring_your_own") {
      return {"have": "wood BBQs"}
    }
    else if (barbecues == "gas_electric") {
      return {"have": "gas/electric BBQs"}
    }
    else if (barbecues == "none") {
      return {"notHave": "BBQs"}
    }
    else {
      return {}
    }
  }

  showers(showers) {
    if (showers == "hot") {
      return {"have": "hot showers"}
    }
    else if (showers == "cold") {
      return {"have": "cold showers"}
    }
    else if (showers == "none") {
      return {"notHave": "showers"}
    }
    else {
      return {}
    }
  }

  facilitiesFields(facilities) {
    var r = {"have": [], "notHave": []}

    var drinkingWater = facilities.drinkingWater;

    this.merge(r, this.toilets(facilities.toilets))
    this.merge(r, this.picnicTables(facilities.picnicTables))
    this.merge(r, this.barbecues(facilities.barbecues))
    this.merge(r, this.showers(facilities.showers))

    if (drinkingWater) {
      r["have"].push("drinking water");
    }
    else {
      r["notHave"].push("drinking water");
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
        <Star starred={this.props.campsite.starred} onClick={() => {this.props.onStarClick(this.props.campsite.id)}}/>
        <h2>{this.props.campsite.longName}</h2>
        <p>in <Link to={"/parks/" + this.props.campsite.park.id}>{this.props.campsite.park.longName}</Link>.</p>
        <div dangerouslySetInnerHTML={this.getDescription()}/>
        <h2>Facilities</h2>
        <p>{this.facilitiesText(this.props.campsite.facilities)}</p>
        <h2>Access</h2>
        <p>{this.accessText(this.props.campsite.access)}</p>
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
  onStarClick: PropTypes.func.isRequired,
  campsite: PropTypes.shape({
    description: PropTypes.string.isRequired,
    facilities: PropTypes.object.isRequired,
    access: PropTypes.object.isRequired,
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
