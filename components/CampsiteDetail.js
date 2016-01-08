var React = require('react');

module.exports = CampsiteDetail = React.createClass({
  getDescription: function() {
    return {__html: this.props.campsite.description};
  },

  // TODO Extract back button into its own component
  navigateBack: function() {
    browserHistory.goBack();
    return false;
  },

  render: function() {
    return (
      <div className="campsite-detail">
        <nav className="navbar navbar-default navbar-fixed-top">
          <div className="container">
            <button className="btn btn-link navbar-link navbar-text pull-left" onClick={this.navigateBack}>
              <span className="glyphicon glyphicon-chevron-left back" aria-hidden="true"></span>
            </button>
            <h1>{this.props.campsite.name}</h1>
          </div>
        </nav>
        <div className="container">
          <h2>In {this.props.campsite.park.longName}</h2>
          <div dangerouslySetInnerHTML={this.getDescription()}/>
        </div>
      </div>
    )
  }
});
