import React, { Component, PropTypes as T  } from 'react';
import AuthService from '../utils/AuthService'
import { hashHistory } from 'react-router';
import { filterUser } from './Functions';

class LandingPage extends Component{
  constructor(props){
    super(props);
    this.state = {
      loggedIn:false
    }
  }
  componentWillMount(){
    const {auth} = this.props;
    const user = auth.getProfile();
    console.log('user in welcome: ',user);

  }

  handleClick(e){
    this.setState({
      loggedIn:true
    });
    hashHistory.push('/newsfeed');
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
        You are signed in as:
        {/* <img src={} /> */}
        <button type="submit" onClick={this.handleClick.bind(this)}>Yes</button>
        {/* <a href="http://localhost:3000/#/newsfeed">Yes</a> */}
      </div>
    );
  }

}

export default LandingPage;
