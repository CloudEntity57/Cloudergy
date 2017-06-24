import React, {Component} from 'react';
import jquery from 'jquery';
import UserHeader from './UserHeader';

//redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { mainApp, updateProfile } from '../actions/index';
import { push } from 'react-router-redux';

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
  componentDidMount(){
    let profile = this.props.profile;
    console.log('my profile: ',profile);
    let user = (this.props.user) ? this.props.user[0] : '';
    console.log('my account info: ',user);
    this.refs.username.value=user.username || profile.name;
    this.refs.ideology.value=user.affiliation || 'none';
    this.refs.education.value=user.education || 'High School/GED';
    this.refs.work.value=user.work || '';
    this.refs.location.value=user.location || '';
    this.refs.bio.value=user.user_story || '';
  }
  submit(e){
    e.preventDefault();
    let userid = this.props.user[0].userid;
    let update = this.props.update;
    let profile = this.props.profile;
    let username = this.refs.username.value;
    console.log('username: ',username);
    if(username==''){
      alert('You must choose a user name!');
      return;
    }
    let ideology = this.refs.ideology.value;
    // this.props.update(ideology);
    let location = this.refs.location.value;
    let education = this.refs.education.value;
    let work = this.refs.work.value;
    let bio = this.refs.bio.value;
    //submit information to DB:
    let uid = profile.third_party_id;
    let data ={
      userinfo:{
        username:username,
        affiliation:ideology,
        education:education,
        location:location,
        work:work,
        user_story:bio
      },
      userid:uid
    }
    // console.log('querypath: ',querypath);
    this.props.updateProfile(data,uid)
    // let userquery = jquery.ajax({
    //   url:querypath,
    //   type:'POST',
    //   data:data
    // });
    // userquery.done((val)=>{
    //   console.log('yeah!',val);
    //   this.props.push('/user/'+userid);
    // });
  }
  render(){
    let profile = this.props.profile;
    console.log('my profile: ',profile);
    let user = (this.props.user) ? this.props.user[0] : '';
    console.log('my account info: ',user);
    const username = profile.username || user.name;
    const userpic = profile.picture;
    console.log('user pic: ',userpic);
    return(
      <div>
      <div className="outer-wrapper">

      </div>
      <div className="wrapper">
        <div className="user-panel">
        {/* <UserHeader username={username}  /> */}
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
                  <option value="na">Other</option>
                </optgroup>
              </select>
              <label>Work</label>
              <input ref="work" className="form form-control" name="user-work" type="text" placeholder="Job title"/>
              <label>Location</label>
              <input ref="location" className="form form-control" name="user-location" type="text" placeholder="Where you live"/>
              <label>Tell Other Users About Yourself (120 characters or less)</label>
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
  let profile = state.allReducers.mainApp.profile;
  return{
    user,
    profile
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    mainApp,
    push,
    updateProfile
  },dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Account);
