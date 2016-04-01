import React from 'react'
import ParkDetail from './ParkDetail'
import Header from './Header'
import shortenName from '../libs/shortenName'

export default class ParkDetailPage extends React.Component {
  render() {
    // Temporary workaround for the fact that parks and campsites do not get
    // update atomically. Only a problem when this page is loaded as the first page
    // TODO Fix this monstrosity
    if (Object.keys(this.props.parks).length == 0 || Object.keys(this.props.campsites).length == 0) {
      return (<div></div>)
    }
    let park = this.props.parks[this.props.params.id]
    let campsites = park.campsite_ids.map((campsite_id) => {
      return this.props.campsites[campsite_id]
    })
    park = Object.assign({}, park, {campsites: campsites})

    return (
      <div className="park-detail-page">
        <Header title={shortenName(park.longName)}/>
        <div className="content">
          <ParkDetail park={park} position={this.props.position}/>
        </div>
      </div>
    )
  }
}
