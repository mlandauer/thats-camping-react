// main.js
var React = require('react');
var ReactDOM = require('react-dom');
var CampsiteList = require('./components/CampsiteList');
var CampsiteDetailPage = require('./components/CampsiteDetailPage');

ReactDOM.render(
  /* <CampsiteDetailPage/> */
  <CampsiteList/>
  ,
  document.getElementById('root')
);
