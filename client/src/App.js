import React, { PropTypes as T } from 'react'
import jquery from 'jquery';
import './App.css';
import LandingPage from './components/LandingPage';
import Header from './components/Header';
import AuthService from './utils/AuthService';
import UserPanel from './components/UserPanel';
import { hashHistory } from 'react-router';
const authid = process.env.REACT_APP_AUTH0_CLIENT_ID;
const authdomain = process.env.REACT_APP_AUTH0_DOMAIN;
const auth = new AuthService(authid, authdomain);

// authorize(e){
//   e.preventDefault();
// }

export class App extends React.Component{

  constructor(props){
    super(props);
    this.state={
      profile:{},
      updated:false,
      affiliation:''
    }
  }
  componentWillMount(){

    let targetURL = "http://localhost:3001/user/"
    console.log('app js auth: ',auth);

    setTimeout(()=>{
      const profile = auth.getProfile();
      console.log('cwm profile: ', profile);
        this.setState({
          profile:profile
        });
        let query = jquery.ajax({
          url:targetURL+profile.clientID,
          type:'GET',
          success:(val)=>{
            console.log('user in app.js: ',val[0]);
            console.log('success: ',val[0]);
            console.log('username: ',val[0].username);
            console.log('affiliation in app.js: ',val[0].affiliation);
            let affiliation = val[0].affiliation;
            this.setState({
              username:val[0].username,
              affiliation:affiliation
            });
          }
        });
        query.done((val)=>{
          console.log('user in database: ',val);
          if(!val || val.length===0){
            console.log('val empty! Not on file.');
            let post = jquery.ajax({
              url:targetURL,
              data:{
                first_name:profile.given_name,
                last_name:profile.family_name,
                photo:profile.picture,
                userid:profile.clientID
              },
              type:'POST'
            });
            hashHistory.push('/account');
          }else{
            console.log('app.js has confirmed user exists');
          }
        });
  },0);


    let users;
    targetURL = "http://localhost:3001/user/"
    jquery.ajax({
      url:targetURL,
      type:"GET",
      success:(users)=>{
        console.log('all the users in the database: ',users);
        this.setState({
          users:users
        });
      }
    });
  }
  logOut(){
    hashHistory.push('/landing');
    console.log('logging out');
    auth.logout();
  }
  toggle_affiliation(affiliation){
    console.log('working in App.js! ',affiliation);
    this.setState({
      affiliation:affiliation
    });
  }
  update(user){
    console.log('Changing global user data: ',user);
    this.setState({
      affiliation:user.affiliation,
      username:user.username
    });
  }
  render(){
   let profile = auth.getProfile();
   let children = null;
  //  let affiliation = (this.state.affiliation) ? this.state.affiliation : '';
   let affiliation = this.state.affiliation;
   console.log('affiliation app.js render: ',affiliation);
   let username = (this.state.username) ? this.state.username : '';
   console.log('username app.js render: ',username);
   let users = (this.state.users) ? this.state.users : '';
   let update = this.update.bind(this);
   if (this.props.children) {
     children = React.cloneElement(this.props.children, {
       //sends props to children
       auth: auth,
       profile:profile,
       username:username,
       affiliation:affiliation,
       update:update
     })
   }
   return (
    <div>
      <Header username={username} affiliation={affiliation} toggle_affiliation={this.toggle_affiliation.bind(this)} logOut={this.logOut.bind(this)} auth={auth} />
      {children || <LandingPage />}
      <UserPanel users={users}/>
    </div>
  )
}
}

export default App;
