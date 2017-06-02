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
import { socialApp, toggleAffiliation, fetchUserInfo, acceptAlly } from '../actions/index';

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
    let potential_allies = this.getPotentialAllies();
    this.setState({
      affiliation:this.props.affiliation,
      potential_allies
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
  getPotentialAllies(){
    let user, uid, userpic, ally_invitations_received, allyRequestNumber,username, affiliation,allyReqs,potential_allies;
    user = (this.props.user !=='') ? this.props.user : [{userid:'',ally_invitations_received:[], allyRequestNumber,username, affiliation,allyReqs,potential_allies}];
    uid = user[0].userid;
    userpic = user[0].photo;
    username = user[0].username;
    affiliation = user[0].affiliation;
    ally_invitations_received = user[0].ally_invitations_received;
    console.log('invites: ',ally_invitations_received);
    allyRequestNumber = (<div className="invites">{ally_invitations_received.length}</div>);
    potential_allies = [];
    if (ally_invitations_received.length>0){
      ally_invitations_received.map((ally)=>{
        this.props.fetchUserInfo(ally).then((val)=>{
          potential_allies.push(val);
        });
      });
      return potential_allies;
    }else{
      return [];
    }
  }
  toggle_affiliation(e){
    console.log('working in Header.js!');
    let affiliation = e.target.value;
    console.log('affiliation: ',affiliation);
    this.setState({
      affiliation:affiliation
    });
    this.props.toggleAffiliation(affiliation);
    // this.props.toggle_affiliation(affiliation);
    //create redux for ^^^^

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

    this.props.acceptAlly({allyId,userId});
    // Functions.acceptAlly(allyId,userId,callback);
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
    // let user = (this.state.user) ? this.state.user : '';
    // if(this.props.user !==''){
      let user, uid, userpic, ally_invitations_received, allyRequestNumber,username, affiliation,allyReqs;
      user = (this.props.user !=='') ? this.props.user : [{userid:'',ally_invitations_received:[], allyRequestNumber,username, affiliation,allyReqs,potential_allies}];
      ally_invitations_received = user[0].ally_invitations_received;
      uid = user[0].userid;
      userpic = user[0].photo;
      username = user[0].username;
      affiliation = user[0].affiliation;
      console.log('user in header render: ',this.props.user);
      let potential_allies = this.state.potential_allies;
        console.log('potential allies render: ',potential_allies);
        allyReqs = potential_allies.map((val)=>{
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
        });
        console.log('allyreqs: ',allyReqs);


    // }
      // potential_allies = this.props.user[0].potential_allies;
      console.log('potential allies: ',potential_allies);
  //Build individual Ally Request tab HTML:

    console.log('userpic render: ',userpic);

//     let potential_allies = (this.state.potential_allies) ? this.state.potential_allies : '';
//     console.log('potential allies: ',potential_allies);
// //Build individual Ally Request tab HTML:
//     let allyReqs = (potential_allies.map((val)=>{
//       console.log('user val: ',val);
//         return (
//           <div id={val[0].userid} className="ally-invitation-tab clearfix">
//             <div className="col-xs-12">
//               {val[0].username} would like to be your ally!
//             </div>
//             <div className="col-xs-12">
//     {/* Accept button */}
//             <a onClick={this.acceptAlly.bind(this)} href="#">
//               <span id={val[0].userid} className='accept-button'>
//                 Accept
//               </span>
//             </a>
//     {/* Ignore button */}
//             <a onClick={this.ignoreRequest.bind(this)} href="#">
//               <span id={val[0].userid} className='accept-button'>
//                 Ignore
//               </span>
//             </a>
//             <UserPic userid={val[0].userid} />
//           </div>
//         </div>
//         );
//     });
  //Build ally requests dropdown HTML
    let previewText = (ally_invitations_received.length>0) ? 'Ally Requests' : 'No New Updates';
    let allyPreview = (this.state.previewingAlly) ?
    (
      <div key="./Header" className="ally-request-dropdown">
        {previewText}
        {allyReqs}
      </div>
    ) : '';
    console.log('aff in render: ',affiliation);
    console.log('user pic: ',userpic);
    let userlink = "/user/"+uid;
    let userimg = (this.props.profile.hasOwnProperty('name')) ? ( <img className="user-pic" src={userpic} alt="user pic" /> ) : '';
    return(
      <header className={this.props.affiliation}>

        <div className="outer-nav-wrapper">
          <div className="nav">
            NMA &nbsp;
            <input type="text" name="search" placeholder="Search CouchPolitics" />

            <div className="navbar-nav nav-right">
              <div><a className="log-out" onClick={this.props.logOut} href="#">Logout</a></div>
              <span>
                <select onChange={this.toggle_affiliation.bind(this)} value={this.props.affiliation} className="header-toggle" name="user-affiliation" id="">
                  <optgroup value="Choose">
                    <option value="conservative">Conservative</option>
                    <option value="liberal">Liberal</option>
                    <option value="none">None</option>
                  </optgroup>
                </select>
              </span>

              <NavLink to={userlink}>
                <a className="header-navlink" href="#">
                  {userimg}
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
  let auth = state.allReducers.mainApp.auth;
  let profile = state.allReducers.mainApp.profile;
  let user = state.allReducers.mainApp.user;
  let loggedIn = state.allReducers.mainApp.loggedIn;
  return{
    previewingAlly,
    affiliation,
    auth,
    user,
    profile,
    loggedIn
  }
}

function mapDispatchToProps(dispatch){
  return bindActionCreators({
    socialApp,
    toggleAffiliation,
    fetchUserInfo,
    acceptAlly
  },dispatch);
}

export default connect(mapStateToProps,mapDispatchToProps)(Header);
