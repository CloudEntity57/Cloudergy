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
import { socialApp, fetchUserInfo, fetchPosts, saveProfile,createNewUser, fetchAllUsers,doAuthentication,logoutUser,createNotifications,createGlobalNotifications,fetchNotifications,fetchGlobalNotifications,reportUserCreation } from './actions/index';
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
    this.props.fetchAllUsers('');
    this.state={
      profile:{},
      updated:false,
      affiliation:''
    }
  }

  componentWillUpdate(){
    this.props.doAuthentication();
  }
  componentWillReceiveProps(nextProps){
    let user = this.props.user;

    console.log('user in willreceive: ',user);

    //needs current profile to see if a corresponding user exists in database
    let profile = this.props.profile;
    console.log('profile in willreceive: ',profile);
    //send profile information to backend to test, and if user doesn't exist under third_party_id, create a user with
    // name,photo,largephoto,userid.

     //create redux action and test user in API:
     let userData = {
         first_name:profile.given_name,
         last_name:profile.family_name,
         username:profile.given_name+' '+profile.family_name,
         photo:profile.picture,
         largephoto:profile.picture_large,
         userid:profile.third_party_id,
         privacy:"public",
         affiliation:"none",
         allies:[],
         ally_requests_sent:[],
         //give every new user a friend invitation from me:
         ally_invitations_received:['zBcuAef0F8bv7o-IAGnDXX4LJBA']
       };
       let notifications = {
           "userid": profile.third_party_id,
           "ally_invitations": [
               "zBcuAef0F8bv7o-IAGnDXX4LJBA"
           ],
           "ally_accepts": [],
           "ally_cancels": [],
           "read": 1
       };

       let globalNotifications = {
           "userid": profile.third_party_id,
           "likes": [],
           "replies": [],
           "read": 0
       };
      //  let name = this.props.users.filter((val)=>{
      //     return val.userid==user[0].userid;
      //  });
      let name=[];
       if(this.props.users.length>0){
         let the_users = this.props.users;
         if(user.length>0){
           for(let i=0; i<the_users.length; i++){
             console.log('filtering user: ',the_users[i],' vs ', user[0].userid);
             if(the_users[i].userid==profile.third_party_id){
              name.push(the_users[i]);
              console.log(the_users[i], ' is a match!! ',name);
            };
              if(i==the_users.length-1 && name.length==0 && this.props.userCreated == false){
                console.log('testing user: ',userData, 'name: ',name);
                if(userData.first_name !== undefined){
                  console.log('creating user: ',userData);
                   this.props.reportUserCreation();
                   this.props.createGlobalNotifications(globalNotifications);
                   this.props.createNotifications(notifications);
                   this.props.createNewUser(userData);
                }
              }
          };
        }

       }


  //create notifications, ally & global:

    //  this.props.createGlobalNotifications(userData);
    //  this.props.push('/');


  }
  update_app(){
    this.forceUpdate();
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
   let notifications = this.state.notes;
   let globalNotifications = this.state.globalNotes;
   let update = this.update.bind(this);
   return (
    <div>
      {/* <Header uid={user.uid} logOut={this.logOut.bind(this)}/> */}
      <Route exact path = "/*" component = {Header} />
      {/* <Route exact path="/" render = {(props)=>(<LandingPage />)} /> */}
      {/* <Route exact path="/" render = {(props)=>{this.updateRouter(); return(<Newsfeed />)}} /> */}
      <Route exact path="/" render = {(props)=>{this.updateRouter(); return(<Newsfeed />)}} />
      {/* <Route path="/account" render = {(props)=>{this.updateRouter(); return(<Account />)}} /> */}
      <Route path="/account" render = {(props)=>{this.updateRouter(); return(<Account />)}} />
      {/* <Route path="/user" render = {(props)=>(<UserPage {...props} />)} /> */}
      <Route path="/user/:userid" render = {(props)=>{this.updateRouter(); return(<UserPage {...props} />)}} />
      {/* <Route path="/user/:userid" component = {UserPage} /> */}
      <Route path="/signedin" component={SignedIn} />
      {/* <Route path="/newsfeed" render = {(props)=>(<Newsfeed {...props} />)} /> */}
      {/* <Route path="/newsfeed" component = {Newsfeed} onEnter={()=>this.requireAuth()} /> */}
      <Route path="/login" component={Login} />

      <Route exact path ="/*" component={UserPanel} />
      {/* <UserPanel/> */}

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
  let didFetchUsers = state.allReducers.mainApp.didFetchUsers;
  let userCreated = state.allReducers.mainApp.userCreated;
  return{
    user,
    users,
    profile,
    token,
    authenticated,
    didFetchUsers,
    userCreated
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
    logoutUser,
    createNotifications,
    createGlobalNotifications,
    fetchNotifications,
    fetchGlobalNotifications,
    reportUserCreation
  },dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(App);
