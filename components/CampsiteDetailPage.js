import React from 'react';
import CampsiteDetail from './CampsiteDetail';

export default class CampsiteDetailPage extends React.Component {
  render() {
    let campsite = this.props.campsites[this.props.params.id]
    if (campsite == undefined) {
      return (<div></div>)
    }
    let park = this.props.parks[campsite.park_id]
    campsite = Object.assign({}, campsite, {park: park})
    return (
      <CampsiteDetail campsite={campsite} />
    )
  }
}
