import React from 'react'
import ParkDetail from './ParkDetail'

export default class ParkDetailPage extends React.Component {
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
      <ParkDetail park={park} position={this.props.position}/>
    )
  }
}
