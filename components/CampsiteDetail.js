import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import simpleFormat from '../libs/simpleFormat'
import { Star } from './Star'

export default class CampsiteDetail extends React.Component {
  getDescription() {
    return {__html: simpleFormat(this.props.campsite.description)};
  }

  sentenceFromFields(fields, haveWord, notHaveWord) {
    var have = fields.have;
    var notHave = fields.notHave;

    var r = "";
    if (have.length > 0) {
      r = r + haveWord + " " + this.listAsText(have);
    }
    if (notHave.length > 0) {
      if (have.length > 0) {
        r = r + " but "
      }
      r = r + notHaveWord + " " + this.listAsText(notHave);
    }
    return this.capitaliseFirstLetter(r)
  }

  facilitiesText(facilities) {
    return this.sentenceFromFields(this.facilitiesFields(facilities), "has", "no")
  }

  accessText(access) {
    return this.sentenceFromFields(this.accessFields(access), "for", "not for")
  }

  capitaliseFirstLetter(text) {
    return text.charAt(0).toUpperCase() + text.slice(1)
  }

  caravans(caravans) {
    switch(caravans) {
      case true:  return {"have":    "caravans"}
      case false: return {"notHave": "caravans"}
      default:    return {}
    }
  }

  trailers(trailers) {
    switch(trailers) {
      case true:  return {"have":    "trailers"}
      case false: return {"notHave": "trailers"}
      default:    return {}
    }
  }

  car(car) {
    switch(car) {
      case true:  return {"have":    "car camping"}
      case false: return {"notHave": "car camping"}
      default:    return {}
    }
  }

  accessFields(access) {
    var r = {"have": [], "notHave": []}
    this.merge(r, this.caravans(access.caravans))
    this.merge(r, this.trailers(access.trailers))
    this.merge(r, this.car(access.car))
    return r
  }

  // WARNING changes r
  merge(r, t) {
    // TODO Generalise this
    if (t["have"]) {
      r["have"].push(t["have"])
    }
    if (t["notHave"]) {
      r["notHave"].push(t["notHave"])
    }
    return r
  }

  toilets(toilets) {
    switch(toilets) {
      case "flush":     return {"have":    "flush toilets"}
      case "non_flush": return {"have":    "non-flush toilets"}
      case "none":      return {"notHave": "toilets"}
      default:          return {}
    }
  }

  picnicTables(picnicTables) {
    switch(picnicTables) {
      case true:  return {"have":    "picnic tables"}
      case false: return {"notHave": "picnic tables"}
      default:    return {}
    }
  }

  barbecues(barbecues) {
    switch(barbecues) {
      // TODO: show whether you need to bring your own firewood elsewhere
      // Like "You will need to bring firewood (if you want to use the wood BBQs) and drinking water"
      case "wood":         return {"have":    "wood BBQs"}
      case "gas_electric": return {"have":    "gas/electric BBQs"}
      case "none":         return {"notHave": "BBQs"}
      default:             return {}
    }
  }

  showers(showers) {
    switch(showers) {
      case "hot":  return {"have":    "hot showers"}
      case "cold": return {"have":    "cold showers"}
      case "none": return {"notHave": "showers"}
      default:     return {}
    }
  }

  drinkingWater(drinkingWater) {
    switch(drinkingWater) {
      case true:  return {"have":    "drinking water"}
      case false: return {"notHave": "drinking water"}
      default:    return {}
    }
  }

  facilitiesFields(facilities) {
    var r = {"have": [], "notHave": []}
    this.merge(r, this.toilets(facilities.toilets))
    this.merge(r, this.picnicTables(facilities.picnicTables))
    this.merge(r, this.barbecues(facilities.barbecues))
    this.merge(r, this.showers(facilities.showers))
    this.merge(r, this.drinkingWater(facilities.drinkingWater))
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
        <h2>{this.props.campsite.name}</h2>
        <p>in <Link to={"/parks/" + this.props.campsite.park.id}>{this.props.campsite.park.name}</Link>.</p>
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
      name: PropTypes.string.isRequired
    }).isRequired
  }).isRequired,
}
