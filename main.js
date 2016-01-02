// main.js
var React = require('react');
var ReactDOM = require('react-dom');

var Campsite = React.createClass({
  render: function() {
    return (
      <div className="campsite">
        <div className="pull-right distance">{this.props.distance}</div>
        <div className="name">{this.props.name}</div>
        <div className="park">{this.props.park}</div>
      </div>
    )
  }
});

ReactDOM.render(
  <Campsite name="Acacia Flat" park="Blue Mountains NP" distance="11 km N"/>,
  document.getElementById('root')
);
