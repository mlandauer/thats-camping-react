var React = require('react');
var Campsite = require('./Campsite');

module.exports = CampsiteList = React.createClass({
  render: function() {
    return (
      <ul className="list-group">
        <li className="list-group-item">
          <Campsite name="Acacia Flat" park="Blue Mountains NP" distance="11 km N"/>
        </li>
        <li className="list-group-item">
          <Campsite name="Perrys Lookdown" park="Blue Mountains NP" distance="12 km N"/>
        </li>
      </ul>
    )
  }
});
