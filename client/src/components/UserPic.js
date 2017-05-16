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
    Functions.getUser(userid).then((user)=>{
      console.log('user in userpic: ',user);
      this.setState({
        user:user
      });
    });
  }
  render(){
    let user = (this.state.user[0]) ? this.state.user[0] : '';
    let teamcolor = user.affiliation + "stripe user-pic-stripe";
    return(
      <div className='user-pic-container'>
        <div className={teamcolor}></div>
        <img id={user.id} className='userpic-pic' src={user.photo} alt='user image' />
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

export default connect(mapStateToProps,mapDispatchToProps)(UserPic);
