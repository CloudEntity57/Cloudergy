import React, {Component} from 'react';
import NavLink from './NavLink';
import UserPic from './UserPic';
import { hashHistory } from 'react-router';
let functionsModule = require('./Functions');
let Functions = new functionsModule();
import jquery from 'jquery';

//redux 
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { mainApp } from '../actions/index';

class Header extends Component{
  constructor(props){
    super(props);
    this.state={
      affiliation:'',
      previewingAlly:false
    }
  }
  componentWillMount(){
    let user = Functions.getCurrentUser();
    // console.log('user in header: ',user);
    let affiliation = this.props.affiliation;
    this.setState({
      affiliation:this.props.affiliation
    });

  }
  componentDidMount(){
    let uid= this.props.uid;
    console.log('uid in header: ',uid);
    let user;
    let userid = Functions.getCurrentUserId();
    Functions.getUser(userid).then((val)=>{
      let user = val;
      console.log('user in header: ',user);
      let potential_allies = [];
      user[0].ally_invitations_received.map((ally)=>{
        Functions.getUser(ally).then((val)=>{
          potential_allies.push(val);
          if(potential_allies.length==user[0].ally_invitations_received.length){
            this.setState({
              potential_allies:potential_allies
            });
          }
        });
      });
      this.setState({
        user:user,
        ally_invitations_received:user[0].ally_invitations_received
      });
    });
  }
  toggle_affiliation(e){
    console.log('working in Header.js!');
    let affiliation = e.target.value;
    console.log('affiliation: ',affiliation);
    this.setState({
      affiliation:affiliation
    });
    this.props.toggle_affiliation(affiliation);
  }
  toggleAllyRequest(e){
    e.preventDefault();
    let previewingAlly = (this.state.previewingAlly) ? false : true;
    this.setState({
      previewingAlly:previewingAlly
    });
    if(this.state.previewingAlly){
      jquery('.invites').remove();
    }
  }
  acceptAlly(e){
    e.preventDefault();
    const allyId = e.target.id;
    const userId = this.state.user[0].userid;
    let invitations_list;
    console.log('ally accepted: ',allyId);
    let callback=function(invites_list){
      invitations_list = invites_list;
    };
    Functions.acceptAlly(allyId,userId,callback);
    this.updateInvitesList(invitations_list);
    let allyLink = "#"+allyId;
    console.log('ally element: ',allyLink);
    jquery('#'+allyId).slideUp();
    jquery('.invites').remove();
  }
  updateInvitesList(invitations_list){
    console.log('calling updateInvitesList');
    console.log('invites: ',invitations_list);
    jquery('.invites').remove();
    this.setState({
      ally_invitations_received:invitations_list,
      previewingAlly:false
    });
  }
  ignoreRequest(e){
    e.preventDefault();
    console.log('ignoring request');
  }
  render(){
    let user = (this.state.user) ? this.state.user : '';
    let uid = (this.state.user) ? this.state.user[0].userid : '';
    let profile = this.props.auth.getProfile();
    let userpic = profile.picture;
    let ally_invitations_received = (this.state.ally_invitations_received) ? this.state.ally_invitations_received : '';
    let allyRequestNumber = (ally_invitations_received.length > 0) ? (<div className="invites">{ally_invitations_received.length}</div>) : ''
    // let allyRequestNumber = (<div className="invites">{ally_invitations_received.length}</div>);
    let username = this.props.username;
    let affiliation = (this.state.affiliation) ? this.state.affiliation : this.props.affiliation;
    let potential_allies = (this.state.potential_allies) ? this.state.potential_allies : '';
    console.log('potential allies: ',potential_allies);
//Build individual Ally Request tab HTML:
    let allyReqs = (potential_allies) ? potential_allies.map((val)=>{
      console.log('user val: ',val);
        return (
          <div id={val[0].userid} className="ally-invitation-tab clearfix">
            <div className="col-xs-12">
              {val[0].username} would like to be your ally!
            </div>
            <div className="col-xs-12">
    {/* Accept button */}
            <a onClick={this.acceptAlly.bind(this)} href="#">
              <span id={val[0].userid} className='accept-button'>
                Accept
              </span>
            </a>
    {/* Ignore button */}
            <a onClick={this.ignoreRequest.bind(this)} href="#">
              <span id={val[0].userid} className='accept-button'>
                Ignore
              </span>
            </a>
            <UserPic userid={val[0].userid} />
          </div>
        </div>
        );
    }) : '';
  //Build ally requests dropdown HTML
    let allyPreview = (this.state.previewingAlly) ?
    (
      <div key="./Header" className="ally-request-dropdown">
        Ally Requests
        {allyReqs}
      </div>
    ) : '';
    console.log('aff in render: ',affiliation);
    console.log('user pic: ',userpic);
    let userlink = "/user/"+uid;
    return(
      <header className={affiliation}>

        <div className="outer-nav-wrapper">
          <div className="nav">
            NMA &nbsp;
            <input type="text" name="search" placeholder="Search CouchPolitics" />

            <div className="navbar-nav nav-right">
              <div><a className="log-out" onClick={this.props.logOut} href="#">Logout</a></div>
              <span>
                <select onChange={this.toggle_affiliation.bind(this)} value={affiliation} className="header-toggle" name="user-affiliation" id="">
                  <optgroup value="Choose">
                    <option value="conservative">Conservative</option>
                    <option value="liberal">Liberal</option>
                    <option value="none">None</option>
                  </optgroup>
                </select>
              </span>


              <NavLink to={userlink}>
                <a className="header-navlink" href="#">
                  <img className="user-pic" src={userpic} alt="user pic" />
                  {username}&nbsp;
                </a>
              </NavLink>

              <NavLink to="/newsfeed"><a href="#">Home</a></NavLink>&nbsp;
              <div className="fa fa-globe">
              </div>
              <div className="ally-request-holder">
                <a href="#" onClick={this.toggleAllyRequest.bind(this)} className="fa fa-handshake-o">
                </a>
                {allyRequestNumber}
                {allyPreview}
              </div>


            </div>

          </div>

        </div>

        <div className="nav-buffer">

        </div>

      </header>
    );
  }
}

function mapStateToProps(state){
  let previewingAlly = state.allReducers.mainApp.previewingAlly;
  let affiliation = state.allReducers.mainApp.affiliation;
  return{
    previewingAlly,
    affiliation
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    mainApp
  },dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Header);
