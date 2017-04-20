import React, { Component } from 'react';

class UserPanel extends Component{
  render(){
    console.log('in userpanel: ',this.props.users);
    let users = (!this.props.users=='') ? this.props.users.map((user)=>{
      return(
        <div className="user-tab">{user.first_name}&nbsp;{user.last_name}<img className='user-pic' src={user.photo} alt='user image' /></div>
      );
    }) : '';
    return(
      <div className="users">
        <h4>Members</h4>
        {users}
      </div>
    );
  }
}

export default UserPanel;
