var React = require('react');
var CampsiteList = require('./CampsiteList');
var CampsiteDetailPage = require('./CampsiteDetailPage');

module.exports = App = React.createClass({
  render: function() {
    // Can swap between two pages here
    Child = CampsiteDetailPage;
    Child = CampsiteList;
    return (
      <Child/>
    )
  }
});
