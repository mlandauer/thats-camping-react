var React = require('react');

module.exports = CampsiteDetail = React.createClass({
  getDescription: function() {
    return {__html: this.props.children};
  },

  render: function() {
    return (
      <div className="campsite-detail">
        <nav className="navbar navbar-default navbar-fixed-top">
          <div className="container">
            <h1>{this.props.name}</h1>
          </div>
        </nav>
        <div className="container">
          <p>{this.props.park}</p>
          <div dangerouslySetInnerHTML={this.getDescription()}/>
        </div>
      </div>
    )
  }
});
