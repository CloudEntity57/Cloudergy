import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Route, Switch, Miss } from 'react-router-dom';
import dotenv from 'dotenv';
import { makeMainRoutes } from './routes.js';
dotenv.config({ silent:true });

//redux links
import {Provider} from 'react-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { connectRouter, ConnectedRouter, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import { createLogger } from 'redux-logger';
const logger = createLogger();

//import components
import Header from './components/Header';
import UserPanel from './components/UserPanel';
import Login from './components/Login';
import Newsfeed from './components/Newsfeed';
import UserPage from './components/UserPage';
import Account from './components/Account';
import SignedIn from './components/SignedIn';
import LandingPage from './components/LandingPage';

import AuthService from './utils/AuthService';
const authid = process.env.REACT_APP_AUTH0_CLIENT_ID;
const authdomain = process.env.REACT_APP_AUTH0_DOMAIN;
const auth = new AuthService(authid, authdomain);
const requireAuth = (nextState, replace) => {
  if (!auth.loggedIn()) {
    replace({ pathname: '/' })
  }
}

//redux internal links
import createHistory from 'history/createBrowserHistory';
const history = createHistory();
import allReducers from './reducers';
import {} from './actions';

//create store

const store = createStore(
  connectRouter(history)(combineReducers({ allReducers })),
  applyMiddleware( thunk, promise, logger, routerMiddleware(history))
);
console.log('state: ',store.getState());

// const routes = makeMainRoutes();

ReactDOM.render(

  <Provider store={ store }>
    <ConnectedRouter history = { history }>
      <Route path="/" component={ App } />
    </ConnectedRouter>
  </Provider>
  ,
    document.getElementById('root')

  );
