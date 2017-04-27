import React, {Component} from 'react';
import NavLink from './NavLink';
import UserPic from './UserPic';
import { hashHistory } from 'react-router';
let functionsModule = require('./Functions');
let Functions = new functionsModule();

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
    // setTimeout(()=>{
    //   let profile = this.props.auth.getProfile();
    //   let userpic = profile.picture;
    //   this.setState({
    //     userpic:userpic
    //   });
    // },2000);
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
  }
  acceptAlly(e){
    e.preventDefault();
    const allyId = e.target.id;
    console.log('ally: ',allyId);
  }
  ignoreRequest(e){
    e.preventDefault();
    console.log('ignoring request');
  }
  render(){
    let user = (this.state.user) ? this.state.user : '';
    let profile = this.props.auth.getProfile();
    let userpic = profile.picture;
    let ally_invitations_received = (this.state.ally_invitations_received) ? this.state.ally_invitations_received : '';
    let allyRequestNumber = (ally_invitations_received.length > 0) ? (<div className="invites">{ally_invitations_received.length}</div>) : ''
    // let userpic = (this.state.user !==undefined) ? user[0].photo : profile.picture;
    let username = this.props.username;
    let affiliation = (this.state.affiliation) ? this.state.affiliation : this.props.affiliation;
    let potential_allies = (this.state.potential_allies) ? this.state.potential_allies : '';
    console.log('potential allies: ',potential_allies);
//Build Ally Requests dropdown HTML:
    let allyReqs = (potential_allies) ? potential_allies.map((val)=>{
      console.log('user val: ',val);
        return (
          <div className="ally-invitation-tab">
            <span className="allyRequestText">
              <span>
                {val[0].username}
              </span> would like to be your ally!
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
          </span>
          <UserPic userid={val[0].userid} />
        </div>
        );
      // return (
      //   <div>{val}</div>
      // );
    }) : '';
    let allyPreview = (this.state.previewingAlly) ?
    (
      <div className="ally-request-dropdown">
        Ally Requests
        {allyReqs}
      </div>
    ) : '';
    console.log('aff in render: ',affiliation);
    console.log('user pic: ',userpic);
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


              <NavLink to="/user">
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

export default Header;
