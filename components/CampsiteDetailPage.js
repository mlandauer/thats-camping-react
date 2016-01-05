var React = require('react');
var CampsiteDetail = require('./CampsiteDetail');

module.exports = CampsiteDetailPage = React.createClass({
  componentWillMount() {
    const id = this.props.params.id

    // Getting the campsite data with this id in a SLOW way
    // TODO Make it not slow
    var campsite = data.campsites.find(function(c) {
      return (c.id == id);
    });

    // Munge the data into a form we want to use
    var campsite = {
      name: campsite.shortName,
      position: {
        lat: campsite.latitude,
        lng: campsite.longitude
      },
      // TODO Convert line breaks into paragraphs
      description: campsite.description,
      park: {
        longName: findParkById(campsite.park, data.parks).longName
      }
    };

    this.setState({campsite: campsite});
  },

  render: function() {
    return (
      <CampsiteDetail name={this.state.campsite.name} park={this.state.campsite.park.longName}>
        {this.state.campsite.description}
      </CampsiteDetail>
    )
  }
});
