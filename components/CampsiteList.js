var React = require('react');
var Campsite = require('./Campsite');

module.exports = CampsiteList = React.createClass({
  render: function() {
    return (
      <ul className="list-group">
        <li className="list-group-item">
          <Campsite name="Acacia Flat" park="Blue Mountains NP" distance="11 km N"       latitude="-33.6149" longitude="150.3553" currentLatitude="33.7125" currentLongitude="150.3119"/>
        </li>
        <li className="list-group-item">
          <Campsite name="Perrys Lookdown" park="Blue Mountains NP" distance="12 km N"       latitude="-33.59935" longitude="150.34592" currentLatitude="33.7125" currentLongitude="150.3119"/>
        </li>
      </ul>
    )
  }
});
