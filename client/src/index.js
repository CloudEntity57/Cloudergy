import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Router, hashHistory, Route, IndexRedirect} from 'react-router';
import dotenv from 'dotenv';
import AuthService from './utils/AuthService';
import Newsfeed from './components/Newsfeed';
import LandingPage from './components/LandingPage';
import Login from './components/Login';
import { makeMainRoutes } from './routes.js';
dotenv.config({ silent:true });


const routes = makeMainRoutes();

ReactDOM.render(
    <div>
      {routes}
    </div>
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
