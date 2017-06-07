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
      user:{}
    }
  }
  componentWillMount(){
    let userid = this.props.userid;
    if(!userid){
      console.log('no userid!');
    }
    Functions.getUser(userid).then((user)=>{
      console.log('user in userpic: ',user);
      this.setState({
        user:user
      });
    });
  }
  render(){
    let user = (this.state.user[0]) ? this.state.user[0] : '';
    let teamcolor = (user !=='') ? user.affiliation + "stripe user-pic-stripe" : "nonestripe user-pic-stripe";
    let photo = (user !=='') ? (<img id={user.id} className='userpic-pic' src={user.photo} alt='user image' />) : (<img id={user.id} className='userpic-pic' src="http://ijmhometutors.com/tutor/server/php/files/51b855e98abd7a5143c4d0176c119c0e/picture/avatar.png" alt='user image' />);
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
  return{
    user
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    mainApp
  },dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(UserPic);
