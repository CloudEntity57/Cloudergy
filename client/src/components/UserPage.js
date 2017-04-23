import React, {Component} from 'react';
import jquery from 'jquery';
import UserHeader from './UserHeader';


class UserPage extends Component{
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
            User info
          </div>
        </div>
      </div>
    </div>
    );
  }
}

export default UserPage;
