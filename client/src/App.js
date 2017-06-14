import React, { PropTypes as T } from 'react'
import jquery from 'jquery';
import './App.css';
import { Switch, Route } from 'react-router-dom';
// import { hashHistory } from 'react-router';
import createHistory from 'history/createBrowserHistory';
const history = createHistory();

import Header from './components/Header';
import UserPanel from './components/UserPanel';
import Login from './components/Login';
import Newsfeed from './components/Newsfeed';
import UserPage from './components/UserPage';
import Account from './components/Account';
import SignedIn from './components/SignedIn';
import LandingPage from './components/LandingPage';

import AuthService from './utils/AuthService';
import { ConnectedRouter } from 'connected-react-router';
const authid = process.env.REACT_APP_AUTH0_CLIENT_ID;
const authdomain = process.env.REACT_APP_AUTH0_DOMAIN;
const auth = new AuthService(authid, authdomain);
console.log('auth : ', auth);

//redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { socialApp, fetchUserInfo, fetchPosts, saveProfile,createNewUser, fetchAllUsers,doAuthentication,logoutUser } from './actions/index';
import { push } from 'connected-react-router';

// validate authentication for private routes
const requireAuth = (nextState, replace) => {
  jquery.when(()=>{
    this.props.doAuthentication();
    console.log('checking token: ',this.props.token);
  }).done(()=>{
    if (!this.props.token) {
      console.log('no token!');
      replace({ pathname: '/' })
    }
  });

}


// authorize(e){
//   e.preventDefault();
// }

class App extends React.Component{


  constructor(props){
    super(props);
    this.props.doAuthentication();
    this.state={
      profile:{},
      updated:false,
      affiliation:''
    }
  }
  componentWillMount(){
    console.log('mounting App.js!!!');
    let targetURL = "http://localhost:3001/user/"
    console.log('app js auth: ',auth);
  }

  componentWillUpdate(){
    this.props.doAuthentication();
  }
  componentWillReceiveProps(nextProps){
    let user = this.props.user;
    let profile = this.props.profile;
    let authenticated = this.props.authenticated;
    console.log('user authenticated: ',authenticated);
    console.log('user in willreceive: ',user);
    console.log('profile in willreceive: ',profile);
    console.log('user after fetching info: ',this.props.user[0]);
    //if user is new, save auth username, affiliation, first, last, pic, big pic, userid, requests sent, received in STORE:
    //all of this is already saved in store under 'user'
    if(user !=='' && user.length===0){
       console.log('user empty! Not on file.');
       //create redux action to save new user in API:
       let userData = {
           first_name:this.props.profile.given_name,
           last_name:this.props.profile.family_name,
           photo:this.props.profile.picture,
           largephoto:this.props.profile.picture_large,
           userid:this.props.profile.clientID,
           ally_requests_sent:[],
           //give every new user a friend invitation from me:
           ally_invitations_received:['J20zp56UZbPRlZ9eB1u41sBs9qXJxBVY']
         };
      //  this.props.createNewUser(userData);
       this.props.push('/');
     }else{
       console.log('app.js has confirmed user exists');
     }

  }
  logOut(){
    this.props.push('/');
    console.log('logging out');
    // this.props.socialApp();
    this.props.logoutUser();
    // auth.logout();
    // this.props.doAuthentication();
    // this.props.fetchPosts('');
  }
  toggle_affiliation(affiliation){
    console.log('working in App.js! ',affiliation);
    //change affiliation in store:
    this.setState({
      affiliation:affiliation
    });
  }
  update(user){
    console.log('Changing global user data: ',user);
    //change user data
    this.setState({
      affiliation:user.affiliation,
      username:user.username
    });
  }

  updateRouter(){
    console.log('updating router!!');
    window.scrollTo(0, 0)
  }
  render(){
   let profile = auth.getProfile();
   let children = this.props.children;
   let user = (this.state.user) ? this.state.user : '';
   console.log('user in app.js render: ',user);
  //  let affiliation = (this.state.affiliation) ? this.state.affiliation : '';
   let affiliation = this.state.affiliation;
   console.log('affiliation app.js render: ',affiliation);
   let username = (this.state.username) ? this.state.username : '';
   console.log('username app.js render: ',username);
   let users = this.props.users;
   let update = this.update.bind(this);
   return (
    <div>
      <Header uid={user.uid} affiliation={affiliation} logOut={this.logOut.bind(this)}/>

      {/* <Route exact path="/" render = {(props)=>(<LandingPage />)} /> */}
      <Route exact path="/" render = {(props)=>{this.updateRouter(); return(<Newsfeed />)}} />
      <Route path="/account" render = {(props)=>{this.updateRouter(); return(<Account />)}} />
      {/* <Route path="/user" render = {(props)=>(<UserPage {...props} />)} /> */}
      <Route path="/user/:userid" render = {(props)=>{this.updateRouter(); return(<UserPage {...props} />)}} />
      {/* <Route path="/user" component = {UserPage} /> */}
      <Route path="/signedin" component={SignedIn} />
      {/* <Route path="/newsfeed" render = {(props)=>(<Newsfeed {...props} />)} /> */}
      {/* <Route path="/newsfeed" component = {Newsfeed} onEnter={()=>this.requireAuth()} /> */}
      <Route path="/login" component={Login} />

      <UserPanel/>

    </div>
  )
}
}

function mapStateToProps(state){
  let user = state.allReducers.mainApp.user;
  let profile = state.allReducers.mainApp.profile;
  let users = state.allReducers.mainApp.users;
  let token = state.allReducers.mainApp.token;
  let authenticated = state.allReducers.mainApp.authenticated;
  return{
    user,
    users,
    profile,
    token,
    authenticated
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    socialApp,
    fetchUserInfo,
    push,
    saveProfile,
    createNewUser,
    fetchAllUsers,
    doAuthentication,
    fetchPosts,
    logoutUser
  },dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
