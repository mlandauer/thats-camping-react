var React = require('react');
var CampsiteDetail = require('./CampsiteDetail');

module.exports = CampsiteDetailPage = React.createClass({
  componentWillMount: function() {
    const id = this.props.params.id
    this.setState({campsite: campsites[id]});
  },

  render: function() {
    return (
      <CampsiteDetail campsite={this.state.campsite} />
    )
  }
});
