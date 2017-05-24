import React, { Component, PropTypes as T  } from 'react';
import AuthService from '../utils/AuthService'
// import { hashHistory } from 'react-router';
import { filterUser } from './Functions';
import jquery from 'jquery';

//redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { mainApp, doAuthentication, login} from '../actions/index';
import { push } from 'connected-react-router';

class LandingPage extends Component{
  constructor(props){
    super(props);
    this.state = {
      loggedIn:false
    }
  }
  componentWillReceiveProps(){
    console.log('auth in landing page: ',this.props.auth);
    const auth = this.props.auth;
    const token = auth.getToken();
    console.log('landing page mounting');
    console.log('user id token: ',this.props.token);
    if(token){
      // filterUser();
      this.props.push('/newsfeed');
    }
  }
  static propTypes = {
    location: T.object,
    auth: T.instanceOf(AuthService)
  }
  // logOut(e){
  //   e.preventDefault();
  //   auth.logout();
  // }

  handleClick(e){
    // this.props.push('/login');
    console.log('handling click');
    this.props.login();
    // jquery.when(()=>{this.props.doAuthentication();}).done(()=>{this.props.push('/newsfeed')});
  }
  logOut(){
    const {auth} = this.props;
    auth.logout();
    this.props.push('/');
  }
  render(){
    const {auth} = this.props;
    return(
      <div>
        Welcome - new users sign up and existing users sign in here!
        <button type="submit" onClick={()=>this.handleClick()}>Sign In</button>

      </div>
    );
  }

}

function mapStateToProps(state){
  let user = state.allReducers.mainApp.user;
  let auth = state.allReducers.mainApp.auth;
  let token = state.allReducers.mainApp.token;
  return{
    user,
    auth,
    token
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    mainApp,
    doAuthentication,
    login,
    push
  },dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(LandingPage);
