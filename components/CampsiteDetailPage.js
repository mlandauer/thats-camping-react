var React = require('react');
var CampsiteDetail = require('./CampsiteDetail');

var CampsiteDetailPage = React.createClass({
  componentWillMount: function() {
    const id = this.props.params.id
    var campsite = this.props.campsites[id];
    var park = this.props.parks[campsite.park_id];
    this.setState({campsite: campsite, park: park});
  },

  render: function() {
    return (
      <CampsiteDetail campsite={this.state.campsite} park={this.state.park} userPosition={this.props.userPosition}/>
    )
  }
});

module.exports = CampsiteDetailPage;
