import React, { Component } from 'react';
let functionsModule = require('./Functions');
let Functions = new functionsModule();

//redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { mainApp } from '../actions/index';


class UserPic extends Component{
  constructor(props){
    super(props);
    this.state={
      photo_status:400,
      user:{
        id:'x',
        photo:'blah'
      }
    }
  }
  componentWillMount(){
    let userid = this.props.userid;
    if(!userid){
      console.log('no userid!');
    }
    this.props.users.map((val)=>{
      if(val.userid===userid){
        console.log('user in userpic: ',val.username)
        this.setState({
          user:val
        });
      }
    });
  }
  componentDidMount(){
    const user = this.state.user;
    let photo_status;
    fetch(user.photo).then((pic)=> {
      console.log('photo status for ',user.photo,': ',pic.status)
      console.log('and the pic ',user.photo, ' with status ',pic.status,'is: ',pic)
      this.setState({
        photo_type:pic.type,
        photo_status:pic.status
      });
    });
  }
  render(){
    let user = (this.state.user) ? this.state.user : '';
    let teamcolor = (user !=='') ? user.affiliation + "stripe user-pic-stripe" : "nonestripe user-pic-stripe";
    //assigning dummy avatar to any photos that when tested in componentdidmount come back with failed status or don't return actual photos (response.type='basic' && response.status ==404):
    let photo = (this.state.photo_type === 'cors' && this.state.photo_status ===200) ? (
      <img id={user.id} className='userpic-pic' src={user.photo} alt='user image' />
    ) : (
      <img id={user.id} className='userpic-pic' src="http://ijmhometutors.com/tutor/server/php/files/51b855e98abd7a5143c4d0176c119c0e/picture/avatar.png" alt='user image' />
    );
      return(
        <div className='user-pic-container'>
          <div className={teamcolor}></div>
          { photo }
          {/* <img id={user.id} className='userpic-pic' src={user.photo} alt='user image' /> */}
        </div>
      );

  }
}
// let user = (this.state.user[0]) ? this.state.user[0] : '';
// let photo = user.photo;
// let userphoto = (this.state.user[0]) ? (<img id={user.id} className='userpic-pic' src={photo} alt='user image' />) : '';
// // userphoto = (this.props.userid !=='none') ? userphoto : (<img id={user.id} className='userpic-pic' src={"http://ijmhometutors.com/tutor/server/php/files/51b855e98abd7a5143c4d0176c119c0e/picture/avatar.png"} alt='user image' />);
// let teamcolor = user.affiliation + "stripe user-pic-stripe";
// // teamcolor = (this.props.userid !=='none') ? teamcolor : "nonestripe user-pic-stripe";

function mapStateToProps(state){
  let user = state.allReducers.mainApp.user;
  let users = state.allReducers.mainApp.users;
  let usersObject = state.allReducers.mainApp.usersObject;
  return{
    user,
    users,
    usersObject
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    mainApp
  },dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(UserPic);
