// main.js
var React = require('react');
var ReactDOM = require('react-dom');
var CampsiteList = require('./components/CampsiteList');
var CampsiteDetail = require('./components/CampsiteDetail');

ReactDOM.render(
  /* <CampsiteDetail name="Acacia Flat" park="Blue Mountains National Park">
    Explore the "cradle of conservation", the Blue Gum Forest. Enjoy birdwatching, long walks and plenty of photogenic flora.
  </CampsiteDetail> */
  <CampsiteList/>
  ,
  document.getElementById('root')
);
