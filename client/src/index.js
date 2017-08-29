import React from 'react';
import ReactDOM from 'react-dom';
import { Route, Switch, Miss } from 'react-router-dom';
import dotenv from 'dotenv';
import { makeMainRoutes } from './routes.js';
dotenv.config({ silent:true });

//redux links
import {Provider} from 'react-redux';
import { createStore, applyMiddleware, combineReducers, compose } from 'redux';
import { connectRouter, ConnectedRouter, routerReducer, routerMiddleware } from 'connected-react-router';
import thunk from 'redux-thunk';
import promise from 'redux-promise';
import { createLogger } from 'redux-logger';
const logger = createLogger();

//import components
import App from './App';
import {withRouter} from 'react-router';
const NonBlockApp = withRouter(App)
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
// const requireAuth = (nextState, replace) => {
//   if (!auth.loggedIn()) {
//     replace({ pathname: '/' })
//   }
// }

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

//redux internal links
import createHistory from 'history/createBrowserHistory';
const history = createHistory();
import allReducers from './reducers';
import {} from './actions';
import { loadState, saveState } from './components/Functions';

//create store
let store;
let current_state;
// old version without compose:
let store_saved = localStorage.getItem('cloudergy_state');
// if(store_saved){
//   current_state = store_saved.getState();
//   console.log('current_state:',current_state)
// }
console.log('store_saved: ',store_saved);
   store = createStore(
    connectRouter(history)(combineReducers({
      allReducers,
      router:routerReducer
    })),
    applyMiddleware( thunk, promise, logger, routerMiddleware(history))
  );
  // console.log('state: ',store.getState());
  localStorage.setItem('cloudergy_state',store);



// store.subscribe(() => {
//   saveState(store.getState());
// });
// const routes = makeMainRoutes();
let rand = Math.random();
let props={
  rand
}

ReactDOM.render(

  <Provider store={ store }>
    <ConnectedRouter history={ history }>
      <NonBlockApp />
    </ConnectedRouter>
  </Provider>
  ,
    document.getElementById('root')

  );


// ReactDOM.render(
//
//   <Provider store={ store }>
//     <ConnectedRouter history={ history }>
//       <NonBlockApp >
//         <Route exact path="/" render = {(props)=>(<LandingPage />)} />
//         <Route path="/account" component={Account} />
//         <Route path="/user" render = {(props)=>(<UserPage {...props} />)} />
//         {/* <Route path="/user" component = {UserPage} /> */}
//         <Route path="/signedin" component={SignedIn} />
//         {/* <Route path="/newsfeed" render = {(props)=>(<Newsfeed {...props} />)} /> */}
//         <Route path="/newsfeed" component = {Newsfeed}/>
//         <Route path="/login" component={Login} />
//       </NonBlockApp>
//     </ConnectedRouter>
//   </Provider>
//   ,
//     document.getElementById('root')
//
//   );
