var React = require('react');
var Campsite = require('./Campsite');

module.exports = CampsiteList = React.createClass({
  render: function() {
    var userPosition = {lat: -33.7125, lng: 150.3119};
    return (
      <ul className="list-group">
        <li className="list-group-item">
          <Campsite name="Acacia Flat" park="Blue Mountains NP" distance="11 km"       bearing="N" position={{lat: -33.6149, lng: 150.3553}} userPosition={userPosition}/>
        </li>
        <li className="list-group-item">
          <Campsite name="Perrys Lookdown" park="Blue Mountains NP" distance="12 km"       bearing="N" position={{lat: -33.59935, lng: 150.34592}} userPosition={userPosition}/>
        </li>
      </ul>
    )
  }
});
