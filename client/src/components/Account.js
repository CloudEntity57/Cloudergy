import React, {Component} from 'react';
import jquery from 'jquery';
import UserHeader from './UserHeader';

//redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { mainApp } from '../actions/index';


class Account extends Component{
  constructor(props){
    super(props);
    this.state={
      updated:false
    }
  }
  // componentWillMount(){
  //   let profile = this.props.profile;
  //   console.log('user on account page: ',profile);
  // }
  submit(e){
    e.preventDefault();
    let update = this.props.update;
    let profile = this.props.profile;
    let username = this.refs.username.value;
    console.log('username: ',username);
    if(username==''){
      alert('You must choose a user name!');
      return;
    }
    let ideology = this.refs.ideology.value;
    this.props.update(ideology);
    let location = this.refs.location.value;
    let education = this.refs.education.value;
    let work = this.refs.work.value;
    let bio = this.refs.bio.value;
    //submit information to DB:
    let uid = profile.clientID;
    let data ={
      username:username,
      affiliation:ideology,
      education:education,
      location:location,
      work:work,
      user_story:bio
    }
    let querypath='http://localhost:3001/user/'+uid;
    console.log('querypath: ',querypath);
    let userquery = jquery.ajax({
      url:querypath,
      type:'POST',
      data:data
    });
    userquery.done((val)=>{
      console.log('yeah!',val);
      update(data);
    });
  }
  render(){
    const profile = this.props.auth.getProfile();
    const username = this.props.username || profile.name;
    const userpic = profile.picture;
    console.log('user pic: ',userpic);
    return(
      <div>
      <div className="outer-wrapper">

      </div>
      <div className="wrapper">
        <div className="user-panel">
        <UserHeader username={username} />
          <div className="user-details">
            <div className="user-details-header">
              <span className="fa fa-user-circle-o" aria-hidden="true"></span>
              Details
            </div>
            <form className="user-details-form form form-default" onSubmit={this.submit.bind(this)} action="index.html" method="post">
              <label>User Name</label> &#x0002A;
              <input ref="username" className="form form-control" type="text" placeholder="Your preferred user handle"/>
              <label>Political ideology</label> &#x0002A;
              <select  ref="ideology" className="form form-control" name="user-affiliation" id="">
                <optgroup value="Choose">
                  <option value="none">None</option>
                  <option value="conservative">Conservative</option>
                  <option value="liberal">Liberal</option>
                </optgroup>
              </select>
              <label>Education</label>
              <select ref="education" className="form form-control" name="user-education" id="">
                <optgroup label="Choose">
                  <option value="High School">High School/GED</option>
                  <option value="Bachelor's">Bachelor's</option>
                  <option value="Master's">Master's</option>
                  <option value="PhD">Ph.D/Doctorate</option>
                  <option value="na">N/A</option>
                </optgroup>
              </select>
              <label>Work</label>
              <input ref="work" className="form form-control" name="user-work" type="text" placeholder="Job title"/>
              <label>Location</label>
              <input ref="location" className="form form-control" name="user-location" type="text" placeholder="Where you live"/>
              <label>Tell Other Users About Yourself (400 characters or less)</label>
              <textarea ref="bio" className="form form-control" placeholder="(displayed at the top of your page)" name="user-bio" id="user-bio" cols="30" rows="10"></textarea>
              <button type="submit" className="btn btn-primary">Update Profile</button>
            </form>
          </div>
        </div>
      </div>
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

export default connect(mapStateToProps,mapDispatchToProps)(Account);
