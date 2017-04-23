import React, { Component } from 'react';
import UserPic from './UserPic';

class UserPanel extends Component{
  constructor(props){
    super(props);
    this.state={
      expanded:false
    }
  }
  expandColumn(){
    let boolean = this.state.expanded;
    boolean = (this.state.expanded) ? false : true;
    this.setState({
      expanded:boolean
    });
  }
  render(){
    console.log('in userpanel: ',this.props.users);

    let expandedColumn = (this.state.expanded) ?
    this.props.users.map((user)=>{
      let color = user.affiliation + ' stripe exp-user-panel-stripe';
      return(
        <div className="user-tab">
          {user.first_name}&nbsp;
          {user.last_name}
          <div className={color}></div>
          <img id={user.id} className='user-pic' src={user.photo} alt='user image' />

        </div>
      )
    })
    : '';

    let memberToggle = (<div onClick={this.expandColumn.bind(this)} className="userToggle">Members</div>);

    let expandedContainer = (this.state.expanded) ? (
      <div className="expanded-user-column">
        {memberToggle}
        {expandedColumn}
      </div>
    ) : '';
    let users = (!this.props.users=='') ? this.props.users.map((user)=>{
      let color = user.affiliation + ' stripe user-panel-stripe';
      return(
        <div className="user-tab">
          {user.first_name}&nbsp;
          {user.last_name}
          <span className={color}></span>
          <img id={user.id} className='user-pic' src={user.photo} alt='user image' />
          {/* <UserPic user={user} /> */}
        </div>

      );
    }) : '';
    return(
      <div className="users">
        {memberToggle}
        {expandedContainer}

        <h4>Members</h4>
        {users}
      </div>
    );
  }
}

export default UserPanel;
