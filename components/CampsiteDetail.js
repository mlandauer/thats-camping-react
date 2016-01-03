var React = require('react');

module.exports = CampsiteDetail = React.createClass({
  render: function() {
    return (
      <div className="campsite-detail">
        <nav className="navbar navbar-default navbar-fixed-top">
          <div className="container">
            <h1 className="navbar-text">{this.props.name}</h1>
          </div>
        </nav>
        <div className="container">
          <p>{this.props.park}</p>
          <p>{this.props.children}</p>
        </div>
      </div>
    )
  }
});
