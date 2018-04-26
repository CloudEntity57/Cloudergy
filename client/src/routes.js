// import React from 'react'
// import {Router, hashHistory, Route, IndexRoute} from 'react-router'
// import AuthService from './utils/AuthService'
// import App from './App'
// import Login from './components/Login';
// import Newsfeed from './components/Newsfeed';
// import UserPage from './components/UserPage';
// import Account from './components/Account';
// import SignedIn from './components/SignedIn';
// import LandingPage from './components/LandingPage';
// const authid = process.env.REACT_APP_AUTH0_CLIENT_ID;
// const authdomain = process.env.REACT_APP_AUTH0_DOMAIN;
// const auth = new AuthService(authid, authdomain);
// console.log('auth : ', auth);
//
// // validate authentication for private routes
// const requireAuth = (nextState, replace) => {
//   if (!auth.loggedIn()) {
//     replace({ pathname: '/' })
//   }
// }
//
// export const makeMainRoutes = () => {
//
//   console.log('making routes');
//   return (
//     <Router history={ hashHistory }>
//       <Route path="/" component={ App } auth={auth}>
//         <IndexRoute component={ LandingPage } />
//         <Route path="landing" component={LandingPage} />
//         <Route path="account" component={Account} />
//         <Route path="user" component={UserPage} />
//         <Route path="user/:uid" component={UserPage} />
//         <Route path="signedin" component={SignedIn} />
//         <Route path="newsfeed" component={Newsfeed} onEnter={requireAuth} />
//         <Route path="login" component={Login} />
//       </Route>
//     </Router>
//   )
// }
//
// export default makeMainRoutes
