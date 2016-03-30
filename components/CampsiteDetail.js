import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import simpleFormat from '../libs/simpleFormat'
import Star from './Star'

export default class CampsiteDetail extends React.Component {
  getDescription() {
    return {__html: simpleFormat(this.props.campsite.description)};
  }

  facilitiesText() {
    var fields = this.facilitiesFields(this.props.campsite.facilities)
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

  accessText() {
    var fields = this.accessFields(this.props.campsite.access)
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

  accessFields(campsite) {
    var have = [];
    var notHave = [];

    var caravans = campsite.caravans;
    var trailers = campsite.trailers;
    var car = campsite.car;

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

  facilitiesFields(campsite) {
    var have = [];
    var notHave = [];

    var toilets = campsite.toilets;
    var picnicTables = campsite.picnicTables;
    var barbecues = campsite.barbecues;
    var showers = campsite.showers;
    var drinkingWater = campsite.drinkingWater;

    if (toilets == "flush") {
      have.push("flush toilets");
    }
    else if (toilets == "non_flush") {
      have.push("non-flush toilets");
    }
    else if (toilets == "none") {
      notHave.push("toilets");
    }

    if (picnicTables) {
      have.push("picnic tables");
    }
    else {
      notHave.push("picnic tables");
    }

    // TODO: show whether you need to bring your own firewood elsewhere
    // Like "You will need to bring firewood (if you want to use the wood BBQs) and drinking water"
    if(barbecues == "wood" || barbecues == "wood_supplied" || barbecues == "wood_bring_your_own") {
      have.push("wood BBQs");
    }
    else if (barbecues == "gas_electric") {
      have.push("gas/electric BBQs");
    }
    else if (barbecues == "none") {
      notHave.push("BBQs");
    }

    if (showers == "hot") {
      have.push("hot showers");
    }
    else if (showers == "cold") {
      have.push("cold showers");
    }
    else if (showers == "none") {
      notHave.push("showers");
    }

    if (drinkingWater) {
      have.push("drinking water");
    }
    else {
      notHave.push("drinking water");
    }
    return {have: have, notHave: notHave};
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
