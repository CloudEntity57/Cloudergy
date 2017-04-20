import React, { Component } from 'react';

class UserHeader extends Component{
  render(){
    const username=this.props.username;
    return(
      <div className="user-header">
        <div className="user-background-photo">
          <div>
            <span id="title-username">{username}</span>
            
          </div>
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
