var React = require('react');

module.exports = Campsite = React.createClass({
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
