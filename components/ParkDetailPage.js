import React from 'react'
import ParkDetail from './ParkDetail'

export default class ParkDetailPage extends React.Component {
  render() {
    let park = this.props.parks[this.props.params.id]
    if (park == undefined) {
      return (<div></div>)
    }
    // Really horrible that we're having to pass both park and parks down the chain
    // TODO Fix this
    return (
      <ParkDetail park={park} parks={this.props.parks} campsites={this.props.campsites} position={this.props.position}/>
    )
  }
}
