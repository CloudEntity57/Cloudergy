import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import Provider from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import App from './App';
import './index.css';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import createLogger from 'redux-logger';
import allReducers from './reducers';

const logger = createLogger();
const store = createStore(
  allReducers,
  applyMiddleware(thunk, promise, logger)
);
console.log('provider: ',Provider);
console.log('app: ',App);
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
