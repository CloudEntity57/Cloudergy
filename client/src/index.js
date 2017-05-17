import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Route } from 'react-router-dom';
import dotenv from 'dotenv';
import AuthService from './utils/AuthService';
import Newsfeed from './components/Newsfeed';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
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


const routes = makeMainRoutes();

ReactDOM.render(
  
  <Provider store={ store }>
    <ConnectedRouter history = { history }>
      <Route path="/" component={ App } />
    </ConnectedRouter>
  </Provider>
  ,
    document.getElementById('root')

  );


  //
  // ReactDOM.render(
  //   <Router history={ hashHistory }>
  //     <Route path="/" component={ App }>
  //       <IndexRoute component={ LandingPage } />
  //       <Route path="/dashboard" component={ Dashboard } />
  //       <Route path="/addsong" component={ SongForm } />
  //       <Route path="/addgig" component={ GigForm } />
  //       <Route path="/gigs" component={ Gigs } />
  //       <Route path="/songs" component={ Songs } />
  //       <Route path="/community" component={ Community } />
  //     </Route>
  //   </Router>,
  //   document.getElementById('root')
  // );
