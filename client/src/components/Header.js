import React, {Component} from 'react';
import NavLink from './NavLink';
import { hashHistory } from 'react-router';

class Header extends Component{
  constructor(props){
    super(props);
  }
  componentDidMount(){
    // setTimeout(()=>{
    //   let profile = this.props.auth.getProfile();
    //   let userpic = profile.picture;
    //   this.setState({
    //     userpic:userpic
    //   });
    // },2000);
  }
  render(){
    let profile = this.props.auth.getProfile();
    let userpic = profile.picture;
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
              <div><NavLink to="/newsfeed"><a href="#">Home</a></NavLink>&nbsp;</div>
              <div>{profile.given_name}&nbsp;</div>
              <img className="user-pic" src={userpic} alt="user pic" />
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
