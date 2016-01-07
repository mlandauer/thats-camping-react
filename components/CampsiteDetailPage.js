var React = require('react');
var CampsiteDetail = require('./CampsiteDetail');

module.exports = CampsiteDetailPage = React.createClass({
  componentWillMount() {
    const id = this.props.params.id
    this.setState({campsite: campsites[id]});
  },

  render: function() {
    return (
      <CampsiteDetail name={this.state.campsite.name} park={this.state.campsite.park.longName}>
        {this.state.campsite.description}
      </CampsiteDetail>
    )
  }
});
