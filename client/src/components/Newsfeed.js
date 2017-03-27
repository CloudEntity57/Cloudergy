import React, { Component } from 'react';
import AuthService from '../utils/AuthService'
import { hashHistory } from 'react-router';

class Newsfeed extends Component{
  logOut(){
    const {auth} = this.props;
    hashHistory.push('/landing');
    auth.logout();
  }
  render(){
    return(
      <div>
        News feed
        <button type="submit" onClick={this.logOut.bind(this)}>Sign Out</button>
      </div>
    )
  }
}

export default Newsfeed;
