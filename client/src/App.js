import React, { PropTypes as T } from 'react'
import jquery from 'jquery';
import './App.css';
import LandingPage from './components/LandingPage';
import Header from './components/Header';
import AuthService from './utils/AuthService';
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
      profile:{}
    }
  }
  componentWillMount(){
    console.log('app js auth: ',auth);
    const profile = auth.getProfile();
    setTimeout(()=>{
      console.log('app js profile: ',profile);
      this.setState({
        profile:profile
      });
    },500);
    jquery.get('http://localhost:3001/user',(val)=>{
        console.log('user in database: ',val);
    });

  }
  logOut(){
    hashHistory.push('/landing');
    console.log('logging out');
    auth.logout();
  }
  render(){
   let profile = this.state.profile;
   let children = null;
   if (this.props.children) {
     children = React.cloneElement(this.props.children, {
       auth: auth //sends auth instance from route to children
     })
   }
   return (
    <div>
      <Header logOut={this.logOut.bind(this)} auth={auth} />
      {children || <LandingPage />}
    </div>
  )
}
}

export default App;
