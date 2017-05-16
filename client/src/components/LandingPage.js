import React, { Component, PropTypes as T  } from 'react';
import AuthService from '../utils/AuthService'
import { hashHistory } from 'react-router';
import { filterUser } from './Functions';
import { push } from 'connected-react-router';

//redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { mainApp } from '../actions/index';

class LandingPage extends Component{
  constructor(props){
    super(props);
    this.state = {
      loggedIn:false
    }
  }
  componentWillMount(){
    const {auth} = this.props;
    const token = auth.getToken();
    console.log('user id token: ',token);
    if(token){
      // filterUser();
      hashHistory.push('/signedin');
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
    hashHistory.push('/login');
  }
  logOut(){
    const {auth} = this.props;
    auth.logout();
    hashHistory.push('/landing');
  }
  render(){
    const {auth} = this.props;
    return(
      <div>
        Welcome - new users sign up and existing users sign in here!
        <button type="submit" onClick={auth.login}>Sign In</button>

      </div>
    );
  }

}

function mapStateToProps(state){
  let user = state.allReducers.mainApp.user;
  return{
    user
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    mainApp
  },dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(LandingPage);
