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
          <p>
            Has {listAsText(this.props.campsite.facilities.have)}
            <br/>
            but no {listAsText(this.props.campsite.facilities.notHave)}
          </p>
          <h2>Access</h2>
          <p>
            For {listAsText(this.props.campsite.access.have)}
            <br/>
            but not for {listAsText(this.props.campsite.access.notHave)}
          </p>
        </div>
      </div>
    )
  }
});
