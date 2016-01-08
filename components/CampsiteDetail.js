var React = require('react');

var listAsText = function(list) {
  if (list.length == 0) {
    return null;
  }
  else if (list.length == 1) {
    return list[0];
  }
  else {
    return list.slice(0, -1).join(", ") + " and " + list[list.length - 1];
  }
};

module.exports = CampsiteDetail = React.createClass({
  getDescription: function() {
    return {__html: this.props.campsite.description};
  },

  // TODO Extract back button into its own component
  navigateBack: function() {
    browserHistory.goBack();
    return false;
  },

  facilitiesText: function() {
    return "Has " + listAsText(this.props.campsite.facilities.have) +
      " but no " + listAsText(this.props.campsite.facilities.notHave);
  },

  accessText: function() {
    if (this.props.campsite.access.have.length == 0) {
      return "Not for " + listAsText(this.props.campsite.access.notHave);
    } else {
      return "For " + listAsText(this.props.campsite.access.have) +
        " but not for " + listAsText(this.props.campsite.access.notHave);
    }
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
          <h2>Facilities</h2>
          <p>{this.facilitiesText()}</p>
          <h2>Access</h2>
          <p>{this.accessText()}</p>
        </div>
      </div>
    )
  }
});
