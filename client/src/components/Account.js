import React, {Component} from 'react';

class Account extends Component{
  constructor(props){
    super(props);
  }
  render(){
    const profile = this.props.auth.getProfile();
    const userpic = profile.picture;
    console.log('user pic: ',userpic);
    return(
      <div>
      <div className="outer-wrapper">

      </div>
      <div className="wrapper">
        <div className="user-panel">
          <div className="user-header">
            <div className="user-background-photo">
              <div>
                <span id="title-username">Joe Lefty</span>
                <span id="view-activity">View: <select name="" id="">
                  <option value="">Us</option>
                  <option value="">Them</option>
                </select>
                </span>
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
          <div className="user-details">
            <div className="user-details-header">
              <span className="fa fa-user-circle-o" aria-hidden="true"></span>
              Details
            </div>
            <form className="user-details-form form form-default" action="index.html" method="post">
              <label>Political ideology</label>
              <select className="form form-control" name="user-affiliation" id="">
                <optgroup label="Choose">
                  <option value="Extreme Right">Extreme Conservative</option>
                  <option value="Extreme Left">Extreme Liberal</option>
                </optgroup>
              </select>
              <label>Education</label>
              <select className="form form-control" name="user-education" id="">
                <optgroup label="Choose">
                  <option value="na">None of your damn business</option>
                  <option value="High School">High School/GED</option>
                  <option value="Bachelor's">Bachelor's</option>
                  <option value="Master's">Master's</option>
                  <option value="PhD">Ph.D/Doctorate</option>
                </optgroup>
              </select>
              <label>Work</label>
              <input className="form form-control" name="user-work"type="text" placeholder="What you do"/>
              <label>Location</label>
              <input className="form form-control" name="user-location"type="text" placeholder="Where you live"/>
              <label>Why you dare enter No Moderates Allowed</label>
              <textarea className="form form-control" placeholder="(displayed at the top of your page)" name="user-bio" id="user-bio" cols="30" rows="10"></textarea>
            </form>
          </div>
        </div>
      </div>
    </div>
    );
  }
}

export default Account;
