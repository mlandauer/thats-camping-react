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
    var have = this.props.campsite.facilities.have;
    var notHave = this.props.campsite.facilities.notHave;

    if (have.length == 0) {
      if (notHave.length == 0) {
        return "";
      } else {
        return "No " + listAsText(notHave);
      }
    } else {
      if (notHave.length == 0) {
        return "Has " + listAsText(have);
      } else {
        return "Has " + listAsText(have) +
          " but no " + listAsText(notHave);
      }
    }
  },

  accessText: function() {
    var have = this.props.campsite.access.have;
    var notHave = this.props.campsite.access.notHave;

    if (have.length == 0) {
      if (notHave.length == 0) {
        return "";
      } else {
        return "Not for " + listAsText(notHave);
      }
    } else {
      if (notHave.length == 0) {
        return "For " + listAsText(have);
      } else {
        return "For " + listAsText(have) +
          " but not for " + listAsText(notHave);
      }
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
