var React = require('react');

module.exports = App = React.createClass({
  render: function() {
    return React.cloneElement(this.props.children, {
      userPosition: {lat: -33.7125, lng: 150.3119}
    });
  }
});
