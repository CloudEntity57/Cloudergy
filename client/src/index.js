import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Router, hashHistory, Route, IndexRoute } from 'react-router';
import dotenv from 'dotenv';
import Newsfeed from './components/Newsfeed';
import LandingPage from './components/LandingPage';
dotenv.config({ silent:true });

ReactDOM.render(

    <Router history={ hashHistory }>
      <Route path="/" component={ App }>
        <IndexRoute component={ LandingPage } />
        <Route path="/newsfeed" component={ Newsfeed } />
      </Route>
    </Router>,
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
