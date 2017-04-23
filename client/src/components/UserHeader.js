import React, { Component } from 'react';
import NavLink from './NavLink';
import { hashHistory } from 'react-router';

class UserHeader extends Component{

  render(){
    var route = hashHistory.getCurrentLocation().pathname;
    console.log('header is now: ',route);

    const username=this.props.username;
    let destination = (route=="/user") ? "/account" : "/user";
    let buttontext = (route=="/user") ? "Edit Profile" : "View Profile";
    return(
      <div className="user-header">
        <div className="user-background-photo">
          <NavLink to={destination}>
            <a href="#">
              <div>
                <span id="title-username">{username}</span>
                <span className="profile-edit-btn">{buttontext}</span>
              </div>
            </a>
          </NavLink>
        </div>
        <ul className="user-nav">
        <a href="#"><li>Posts</li></a>
        <a href="#"><li>About</li></a>
        <a href="#"><li>Allies</li></a>
        </ul>
          <div className="profile-pic">
          </div>
      </div>
    );
  }
}

export default UserHeader;
