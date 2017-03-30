import React, {Component} from 'react';
import { hashHistory } from 'react-router';

class Header extends Component{
  constructor(props){
    super(props);
  }
  render(){
    const profile = this.props.auth.getProfile();
    const userpic = profile.picture;
    console.log('user pic: ',userpic);
    return(
      <header>
        <div className="outer-nav-wrapper">
          <div className="nav">
            NMA
            <input type="text" name="search" placeholder="Search No Moderates Allowed" />
            <div className="navbar-nav nav-right">
              <div><a className="log-out" onClick={this.props.logOut} href="#">Logout</a></div>
              <div>icon&nbsp;</div>
              <div>icon&nbsp;</div>
              <div>icon&nbsp;</div>
              <div>Home&nbsp;</div>
              <div>{profile.given_name}&nbsp;</div>
              <img className="user-pic img-responsive" src={userpic} alt="user pic" />
            </div>
          </div>

        </div>

        <div className="nav-buffer">

        </div>
      </header>
    );
  }
}

export default Header;
