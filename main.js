// main.js
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { HashRouter, Route, Redirect } from 'react-router-dom';
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import * as storage from 'redux-storage'
import createEngine from 'redux-storage-engine-localstorage'
import migrate from 'redux-storage-decorator-migrate'
// This loads everything (for font awesome) with the defaults
import 'font-awesome-webpack'
import './styles/style.scss'

// Uncomment the bits of bootstrap javascript belowwhen we need them
//
// require('bootstrap/js/transition.js')
// require('bootstrap/js/alert.js')
// require('bootstrap/js/button.js')
// require('bootstrap/js/carousel.js')
// require('bootstrap/js/collapse.js')
// require('bootstrap/js/dropdown.js')
// require('bootstrap/js/modal.js')
// require('bootstrap/js/tooltip.js')
// require('bootstrap/js/popover.js')
// require('bootstrap/js/scrollspy.js')
// require('bootstrap/js/tab.js')
// require('bootstrap/js/affix.js')

import App from './components/App';
import CampsiteDetailPage from './components/CampsiteDetailPage';
import AboutPage from './components/AboutPage'
import { reducer } from './reducers'

import attachFastClick from 'fastclick'
attachFastClick.attach(document.body)

const reducerWithStorage = storage.reducer(reducer)
var engine = createEngine('thats-camping')
engine = migrate(engine, 1)

engine.addMigration(1, (state) => {
  // We rename longName in parks and campsites to name
  // We handle this by emptying out parks and campsites.
  // It will get reloaded from the API
  return Object.assign({}, state, {parks: {}, campsites: {}})
});

const storageMiddleware = storage.createMiddleware(engine)

const createStoreWithMiddleware = compose(
  applyMiddleware(thunkMiddleware, storageMiddleware),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)(createStore)

let store = createStoreWithMiddleware(reducerWithStorage)

const load = storage.createLoader(engine)
load(store)

// Check if a new cache is available on page load.
window.addEventListener('load', function(e) {

  window.applicationCache.addEventListener('updateready', function(e) {
    if (window.applicationCache.status == window.applicationCache.UPDATEREADY) {
      // Browser downloaded a new app cache.
      window.location.reload();
    } else {
      // Manifest didn't changed. Nothing new to server.
    }
  }, false);

}, false);

ReactDOM.render(
  <Provider store={store}>
    <div>
      <HashRouter>
        <Route path="/" component={App} />
      </HashRouter>
    </div>
  </Provider>,
  document.getElementById('root')
);
