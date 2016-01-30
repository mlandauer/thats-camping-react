import React from 'react';
import Header from './Header'
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
      <div className="campsite-detail-page">
        <Header title={campsite.shortName}/>
        <div className="content">
          <div className="container">
            <CampsiteDetail campsite={campsite} />
          </div>
        </div>
      </div>
    )
  }
}
