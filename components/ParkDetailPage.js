import React from 'react'
import ParkDetail from './ParkDetail'

export default class ParkDetailPage extends React.Component {
  render() {
    let park = this.props.parks[this.props.params.id]
    if (park == undefined) {
      return (<div></div>)
    }
    return (
      <ParkDetail park={park} position={this.props.position}/>
    )
  }
}
