var React = require('react');
var CampsiteDetail = require('./CampsiteDetail');

module.exports = CampsiteDetailPage = React.createClass({
  render: function() {
    return (
      <CampsiteDetail name="Acacia Flat" park="Blue Mountains National Park">
        Explore the "cradle of conservation", the Blue Gum Forest. Enjoy birdwatching, long walks and plenty of photogenic flora.
      </CampsiteDetail>
    )
  }
});
