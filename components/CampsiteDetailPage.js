import React from 'react';
import CampsiteDetail from './CampsiteDetail';

export default class CampsiteDetailPage extends React.Component {
  componentWillMount() {
    const id = this.props.params.id
    var campsite = this.props.campsites[id];
    var park = this.props.parks[campsite.park_id];
    this.setState({campsite: campsite, park: park});
  }

  render() {
    return (
      <CampsiteDetail campsite={this.state.campsite} park={this.state.park} position={this.props.position}/>
    )
  }
}
