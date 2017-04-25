import React, { Component } from 'react';
import UserPic from './UserPic';
import NavLink from './NavLink';

class UserPanel extends Component{
  constructor(props){
    super(props);
    this.state={
      expanded:false
    }
  }
  expandColumn(e){
    e.preventDefault();
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
      // let userLink='/user/'+user.userid;
      //Add user chat functionality here:
      return(
        // <NavLink to={userLink}>
          <div className="user-tab">
            {user.first_name}&nbsp;
            {user.last_name}
            <div className={color}></div>
            <img id={user.id} className='user-pic' src={user.photo} alt='user image' />

          </div>
        // </NavLink>
      )
    })
    : '';

    let memberToggle = (<a className="member-toggle" href="#"><div onClick={this.expandColumn.bind(this)} className="userToggle">&middot; Members</div></a>);

    let expandedContainer = (this.state.expanded) ? (
      <div className="expanded-user-column">
        {memberToggle}
        {expandedColumn}
      </div>
    ) : '';
    let users = (!this.props.users=='') ? this.props.users.map((user)=>{
      let color = user.affiliation + ' stripe user-panel-stripe';
      let userLink='/user/'+user.userid;
      //Remove NavLink and add user chat functionality here:
      return(
        <NavLink to={userLink}>
          <div className="user-tab">
            {user.first_name}&nbsp;
            {user.last_name}
            <span className={color}></span>
            <img id={user.id} className='user-pic' src={user.photo} alt='user image' />
            {/* <UserPic user={user} /> */}
          </div>
        </NavLink>

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
