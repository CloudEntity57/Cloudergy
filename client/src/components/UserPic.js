import React, { Component } from 'react';


class UserPic extends Component{
  constructor(props){
    super(props);
    this.state={
      user:{}
    }
  }
  componentWillMount(){
    this.setState({
      user:this.props.user
    });
  }
  render(){
    let user = (this.state.user) ? this.state.user : '';
    let teamcolor = user.affiliation + "stripe user-stripe";
    return(
      <div className='user-pic-container'>
        <div className={teamcolor}></div>
        <img id={user.id} className='userpic' src={user.photo} alt='user image' />
      </div>
    );
  }
}

export default UserPic;
