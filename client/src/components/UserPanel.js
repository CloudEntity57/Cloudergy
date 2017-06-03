import React, { Component } from 'react';
import UserPic from './UserPic';
import NavLink from './NavLink';

//redux
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { mainApp } from '../actions/index';
import { push } from 'react-router-redux';

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
            {user.username}
            <div className={color}></div>
            <img id={user.id} className='user-pic' src={user.photo} alt='user image' />

          </div>
        // </NavLink>
      )
    })
    : '';

    let memberToggleBar = (<a className="member-toggle" href="#"><div onClick={this.expandColumn.bind(this)} className="userToggle">&middot; Members</div></a>);

    let expandingUserColumn = (this.state.expanded) ? (
      <div className="expanded-user-column">
        {memberToggleBar}
        {expandedColumn}
      </div>
    ) : '';
    let users = (!this.props.users=='') ? this.props.users.map((user)=>{
      let color = user.affiliation + ' stripe user-panel-stripe';
      let userid = user.userid;
      let userLink='/user/'+userid;

      //Remove NavLink and add user chat functionality here:
      return(
        // <NavLink to={userLink}>
          <a onClick={()=>this.props.push(userLink)} className="link_normalize" href="#">
            <div className="userpic-tab">
            {/* <div className="user-tab"> */}
              {user.first_name}&nbsp;{user.last_name}
              {/* <span className={color}></span> */}
              {/* <img id={user.id} className='user-pic' src={user.photo} alt='user image' /> */}
              <div><UserPic userid={userid} /></div>
            </div>
          </a>
        // </NavLink>

      );
    }) : '';
    return(
      <div className="users">
        {memberToggleBar}
        {expandingUserColumn}

        <h4>Members</h4>
        {users}
      </div>
    );
  }
}

function mapStateToProps(state){
  let user = state.allReducers.mainApp.user;
  let users = state.allReducers.mainApp.users;
  return{
    user,
    users
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    mainApp,
    push
  },dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(UserPanel);
