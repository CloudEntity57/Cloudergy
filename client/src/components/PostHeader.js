import React, { Component } from 'react';
import jquery from 'jquery';

class PostHeader extends Component{
  constructor(props){
    super(props);
    this.state={
      userpreview:false
    }
  }
  displayUser(e){
    // console.log('displaying!');
    // setTimeout(()=>{
      this.setState({
        userpreview:true
      });
    // },1000);
  }
  hideUser(e){
    this.setState({
      userpreview:false
    });
  }
  render(){
    let userpic = this.props.userpic;
    let user = this.props.user;
    let date = this.props.date;
    let userinfo = (this.state.userpreview) ? (
      <div className="jumbotron">User Info</div>
    ) : '';
    return(
      <div href="#" className="post-header">
        <div className="post-pic-col">
          { userpic }
        </div>

        <div className="post-header-text">
          <span className="post-username">
            <a href="#" onMouseEnter={this.displayUser.bind(this)} onMouseLeave={this.hideUser.bind(this)}>
            { user.username }
            </a>
            {userinfo}
          </span>
          <div className="post-date">{date}</div>
        </div>
      </div>
    )
  }
}

export default PostHeader;
