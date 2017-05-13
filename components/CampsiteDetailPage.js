import React from 'react'
import PropTypes from 'prop-types';
import Header from './Header'
import CampsiteDetail from './CampsiteDetail';
import shortenName from '../libs/shortenName'

class CampsiteDetailPage extends React.Component {
  render() {
    let campsite = this.props.campsites[this.props.id]
    if (campsite == undefined) {
      return (<div></div>)
    }
    let park = this.props.parks[campsite.park_id]
    campsite = Object.assign({}, campsite, {park: park})
    return (
      <div className="campsite-detail-page">
        <Header title={shortenName(campsite.name)}/>
        <div className="content">
          <div className="container">
            <CampsiteDetail campsite={campsite} onStarClick={this.props.onStarClick}/>
          </div>
        </div>
      </div>
    )
  }
}

export default CampsiteDetailPage
