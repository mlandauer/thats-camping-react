// main.js
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import {persistStore, autoRehydrate} from 'redux-persist'
// This loads everything (for font awesome) with the defaults
import 'font-awesome-webpack'
import './styles/style.scss'

import { WrappedApp } from './components/App';
import { reducer } from './reducers'

// TODO: Move from redux-thunk to redux-saga (https://github.com/redux-saga/redux-saga)

const store = createStore(
  reducer,
  undefined,
  compose(
    applyMiddleware(thunkMiddleware),
    autoRehydrate()
  )
)

// begin periodically persisting the store
persistStore(store)

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
    <WrappedApp />
  </Provider>,
  document.getElementById('root')
);
