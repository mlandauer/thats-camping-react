var React = require('react');

module.exports = App = React.createClass({
  getInitialState: function() {
      return {userPosition: null};
  },

  componentWillMount: function() {
    this.updateLocation();
  },

  updateLocation: function() {
    navigator.geolocation.getCurrentPosition(this.geoLocation, this.geoError,
      {enableHighAccuracy: true});
  },

  geoLocation: function(location){
    this.setState({userPosition: {
      lat: location.coords.latitude,
      lng: location.coords.longitude
    }});
  },

  geoError: function(err) {
    console.warn('Error getting location (' + err.code + '): ' + err.message);
  },

  render: function() {
    return React.cloneElement(this.props.children, {
      userPosition: this.state.userPosition
    });
  }
});
