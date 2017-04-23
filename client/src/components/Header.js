import React, {Component} from 'react';
import NavLink from './NavLink';
import { hashHistory } from 'react-router';

class Header extends Component{
  constructor(props){
    super(props);
    this.state={
      affiliation:''
    }
  }
  componentWillMount(){
    let affiliation = this.props.affiliation;
    this.setState({
      affiliation:this.props.affiliation
    });

  }
  componentDidMount(){
    let uid= this.props.uid;
    console.log('uid in header: ',uid);
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
  render(){
    let profile = this.props.auth.getProfile();
    let userpic = profile.picture;
    let username = this.props.username;
    let affiliation = (this.state.affiliation) ? this.state.affiliation : this.props.affiliation;
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

              <div className="fa fa-globe">
              </div>
              <NavLink to="/newsfeed"><a href="#">Home</a></NavLink>&nbsp;


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
