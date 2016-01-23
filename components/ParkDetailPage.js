import React from 'react'
import ParkDetail from './ParkDetail'

// Ugh
import createBrowserHistory from 'history/lib/createBrowserHistory';
var browserHistory = createBrowserHistory();

export default class ParkDetailPage extends React.Component {
  // TODO Extract back button into its own component
  navigateBack() {
    browserHistory.goBack();
    return false;
  }

  render() {
    let park = this.props.parks[this.props.params.id]
    if (park == undefined) {
      return (<div></div>)
    }
    let campsites = park.campsite_ids.map((campsite_id) => {
      return this.props.campsites[campsite_id]
    })
    park = Object.assign({}, park, {campsites: campsites})

    return (
      <div className="park-detail-page">
        <nav className="navbar navbar-default navbar-fixed-top">
          <div className="container">
            <button className="btn btn-link navbar-link navbar-text pull-left" onClick={this.navigateBack}>
              <span className="glyphicon glyphicon-chevron-left back" aria-hidden="true"></span>
            </button>
            <h1>{park.shortName}</h1>
          </div>
        </nav>
        <ParkDetail park={park} position={this.props.position}/>
      </div>
    )
  }
}
